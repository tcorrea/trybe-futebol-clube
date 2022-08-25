import IMatch from '../match/IMatch';

export default interface ITeam {
  id: number,
  teamName: string,
  homeMatch?: IMatch[],
}
