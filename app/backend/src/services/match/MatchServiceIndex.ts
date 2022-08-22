import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import IMatch from '../../interfaces/match/IMatch';

export default class MatchServiceIndex {
  public static async index(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches as IMatch[];
  }
}
