import ITeam from '../../interfaces/team/ITeam';
import Team from '../../database/models/Team';

export default class TeamServiceShow {
  public static async show(id: number): Promise<ITeam> {
    const team = await Team.findByPk(id);
    // todo: throw error
    return team as ITeam;
  }
}
