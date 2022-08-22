import ITeam from "../../interfaces/team/ITeam"
import Team from "../../database/models/Team"

export default class TeamServiceIndex {
  public static async index(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    // todo: if throw error
    return teams;
  }
}