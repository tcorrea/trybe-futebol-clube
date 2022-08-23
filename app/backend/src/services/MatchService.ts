import Team from '../database/models/Team';
import Match from '../database/models/Match';
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
    const storedMatch = await Match.create({ ...match, inProgress: true });
    return storedMatch;
  }
}
