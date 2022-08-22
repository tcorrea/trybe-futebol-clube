import IMatch from './IMatch';

export default interface IDisplayMatch extends IMatch {
  teamHome: { teamName: string },
  teamAway: { teamName: string },
}
