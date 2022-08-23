import ITeam from '../interfaces/team/ITeam';
import Team from '../database/models/Team';

export default class TeamServiceIndex {
  public static async index(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    // todo: if throw error
    return teams;
  }

  public static async show(id: number): Promise<ITeam> {
    const team = await Team.findByPk(id);
    // todo: throw error
    return team as ITeam;
  }

  public static async findByArray(ids: number[]): Promise<ITeam[]> {
    return await Team.findAll({ where: { id: ids } });
  }
}
