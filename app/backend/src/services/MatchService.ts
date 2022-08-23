import Team from '../database/models/Team';
import Match from '../database/models/Match';
import TeamService from './TeamService';
import IMatch from '../interfaces/match/IMatch';

export default class MatchService {
  public static async index(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches as IMatch[];
  }

  public static async show(status: boolean): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: status },
    });
    return matches;
  }

  public static async store(match: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'UNAUTHORIZED';
      throw e;
    }
    const result = await TeamService.findByArray([homeTeam, awayTeam]);
    if (result.length < 2) {
      const notFoundTeamError = new Error('There is no team with such id!');
      notFoundTeamError.name = 'NOTFOUND';
      throw notFoundTeamError;
    }
    const storedMatch = await Match.create({ ...match, inProgress: true });
    return storedMatch;
  }

  public static async update(score: IMatch, id: number): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = score;
    const [effectedRows] = await Match.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return effectedRows;
  }

  public static async updateFinished(id: number): Promise<number> {
    const [affectedRows] = await Match.update({ inProgress: false }, {
      where: { id },
    });
    return affectedRows;
  }
}
