import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import service from '../../services/match/MatchServiceIndex';
import IMatch from '../../interfaces/match/IMatch';

export default class MatchControllerIndex {
  public static async index(_req: Request, res: Response) {
    const matches: IMatch[] = await service.index();

    res.status(StatusCodes.OK).json(matches);
  }
}
