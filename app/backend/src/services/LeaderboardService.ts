import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/team/ITeam';
import IMatch from '../interfaces/match/IMatch';

export default class LeaderboardService {
  public static async homeSequelize(): Promise<ILeaderboard[]> {
    const homeMatches = await LeaderboardService.getTeamHomeOrAway('homeMatch');

    const leaderboardHome = homeMatches.map<ILeaderboard>((item) => {
      if (!item.homeMatch) throw new Error('Nenhum partida encontrada');
      return LeaderboardService.getLeaderboard(item.homeMatch, item.teamName);
    });
    return LeaderboardService.sortLeaderBoard(leaderboardHome);
  }

  private static getLeaderboard(matches: IMatch[], teamName: string) {
    const totalGames = matches.length;
    const teamResults = LeaderboardService.getTeamResults(matches);
    const goalsFavor = matches.map((i) => i.homeTeamGoals).reduce((acc, n) => acc + n, 0);
    const goalsOwn = matches.map((i) => i.awayTeamGoals).reduce((acc, n) => acc + n, 0);
    const efficiency = (teamResults.victories * 3) + teamResults.draws;
    return {
      name: teamName,
      totalPoints: (teamResults.victories * 3) + teamResults.draws,
      totalGames,
      totalVictories: teamResults.victories,
      totalDraws: teamResults.draws,
      totalLosses: teamResults.losses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((efficiency / (totalGames * 3)) * 100).toFixed(2),
    };
  }

  private static getTeamResults(matches: IMatch[]) {
    const victories = matches.reduce((acc, i) => {
      if (i.homeTeamGoals > i.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    const losses = matches.reduce((acc, i) => {
      if (i.homeTeamGoals < i.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return { victories, losses, draws: matches.length - (victories + losses) };
  }

  private static async getTeamHomeOrAway(homeOrAway: 'homeMatch' | 'awayMatch'): Promise<ITeam[]> {
    const result = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [{ model: Match, as: homeOrAway, where: { inProgress: false } }],
    });
    return result;
  }

  private static sortLeaderBoard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return a.goalsOwn - b.goalsOwn;
    });
  }
}
