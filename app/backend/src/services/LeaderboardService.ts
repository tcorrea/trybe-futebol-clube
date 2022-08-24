import TeamService from './TeamService';
import MatchService from './MatchService';
import IMatch from '../interfaces/match/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService {

  public static async home(): Promise<ILeaderboard[]> {

    // Buscar todos os times - array
    const teams = await TeamService.index();


    // Buscar todas as partidas
    const matches = await MatchService.index();

    // Partidas finalizadas
    const finishedMatches = matches.filter((match) => match.inProgress === false);

    const leaderboardWip = teams.map((team) => {
      // const playedMatches: IMatch[] = finishedMatches.filter((match) => match.homeTeam === team.id || match.awayTeam === team.id);
      const playedMatches: IMatch[] = finishedMatches.filter((match) => match.homeTeam === team.id);
      const totalGames: number = playedMatches.length;

      // let leaderboardHome: ILeaderboard = { goalsBalance: 0 };
      // leaderboardHome.goalsBalance = 0;

      const victories = playedMatches.filter((match) => {
        return (match.homeTeam === team.id && match.homeTeamGoals > match.awayTeamGoals) ||
          (match.awayTeam === team.id && match.homeTeamGoals < match.awayTeamGoals)
      });
      const losses = playedMatches.filter((match) => {
        return (match.homeTeam === team.id && match.homeTeamGoals < match.awayTeamGoals) ||
          (match.awayTeam === team.id && match.homeTeamGoals > match.awayTeamGoals)
      });

      const draws = totalGames - (victories.length + losses.length)

      const totalPoints = (victories.length * 3) + draws;

      const goalsFavor = playedMatches.reduce<number>((acc, currMatch) => {
        if (currMatch.homeTeam === team.id) return acc + currMatch.homeTeamGoals;
        if (currMatch.awayTeam === team.id) return acc + currMatch.awayTeamGoals;
        return acc;
      }, 0);

      const goalsOwn = playedMatches.reduce<number>((acc, currMatch) => {
        if (currMatch.homeTeam === team.id) return acc + currMatch.awayTeamGoals;
        if (currMatch.awayTeam === team.id) return acc + currMatch.homeTeamGoals;
        return acc;
      }, 0);

      const goalsBalance = goalsFavor - goalsOwn;
      const efficiency = totalPoints / (totalGames * 3) * 100;


      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: victories.length,
        totalDraws: draws,
        totalLosses: losses.length,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency: efficiency.toFixed(2),
      };

    });

    const sortedLeaderboard = leaderboardWip.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return a.goalsOwn - b.goalsOwn;
    });

    return sortedLeaderboard;
  }

  // private static getVictories(matches: IMatch[], teamId: number): number {
  //   const victories = matches.filter((match) => {
  //     return (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) ||
  //       (match.awayTeam === teamId && match.homeTeamGoals < match.awayTeamGoals)
  //   });
  //   return victories.length;
  // }

  // private static getLosses(matches: IMatch[], teamId: number): number {
  //   const losses = matches.filter((match) => {
  //     return (match.homeTeam === teamId && match.homeTeamGoals < match.awayTeamGoals) ||
  //       (match.awayTeam === teamId && match.homeTeamGoals > match.awayTeamGoals)
  //   });
  //   return losses.length;
  // }

  // public static async index(): Promise<ILeaderboard[]> {
  //   // Buscar todos os times - array
  //   const teams = await TeamService.index();


  //   // Buscar todas as partidas
  //   const matches = await MatchService.index();

  //   // Partidas finalizadas
  //   const finishedMatches = matches.filter((match) => match.inProgress === false);

  //   // Map ou reduce? Provavel reduce
  //   const leaderboardWip = teams.map((team) => {
  //     const playedMatches: IMatch[] = finishedMatches.filter((match) => match.homeTeam === team.id || match.awayTeam === team.id);
  //     const totalGames: number = playedMatches.length;

  //     const victories = playedMatches.filter((match) => {
  //       return (match.homeTeam === team.id && match.homeTeamGoals > match.awayTeamGoals) ||
  //         (match.awayTeam === team.id && match.homeTeamGoals < match.awayTeamGoals)
  //     });
  //     const losses = playedMatches.filter((match) => {
  //       return (match.homeTeam === team.id && match.homeTeamGoals < match.awayTeamGoals) ||
  //         (match.awayTeam === team.id && match.homeTeamGoals > match.awayTeamGoals)
  //     });

  //     const draws = totalGames - (victories.length + losses.length)

  //     const totalPoints = (victories.length * 3) + draws;

  //     const goalsFavor = playedMatches.reduce<number>((acc, currMatch) => {
  //       if (currMatch.homeTeam === team.id) return acc + currMatch.homeTeamGoals;
  //       if (currMatch.awayTeam === team.id) return acc + currMatch.awayTeamGoals;
  //       return acc;
  //     }, 0);

  //     const goalsOwn = playedMatches.reduce<number>((acc, currMatch) => {
  //       if (currMatch.homeTeam === team.id) return acc + currMatch.awayTeamGoals;
  //       if (currMatch.awayTeam === team.id) return acc + currMatch.homeTeamGoals;
  //       return acc;
  //     }, 0);

  //     const goalsBalance = goalsFavor - goalsOwn;
  //     const efficiency = totalPoints / (totalGames * 3) * 100;


  //     return {
  //       name: team.teamName,
  //       totalPoints,
  //       totalGames,
  //       totalVictories: victories.length,
  //       totalDraws: draws,
  //       totalLosses: losses.length,
  //       goalsFavor,
  //       goalsOwn,
  //       goalsBalance,
  //       efficiency: efficiency.toFixed(2),
  //     };

  //     // console.log('team', team.teamName);
  //     // console.log('total games', totalGames);
  //     // console.log('total points', totalPoints);
  //     // console.log('vitories', victories.length);
  //     // console.log('losses', losses.length);
  //     // console.log('draws', draws);
  //     // console.log('goalsFavor ', goalsFavor);
  //     // console.log('goalsOwn ', goalsOwn);
  //     // console.log('goalsBalance ', goalsBalance);
  //     // console.log('efficiency ', efficiency);
  //   });

  //   const sortedLeaderboard = leaderboardWip.sort((a, b) => {
  //     if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
  //     if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
  //     if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
  //     if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
  //     return a.goalsOwn - b.goalsOwn;
  //   });

  //   console.log(sortedLeaderboard);
  //   console.log(sortedLeaderboard.length);

  //   return sortedLeaderboard;

  // }
}
