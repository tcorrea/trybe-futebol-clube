import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/MatchService';
import IMatch from '../interfaces/match/IMatch';

export default class MatchController {
  public static async index(_req: Request, res: Response) {
    const matches: IMatch[] = await MatchService.index();
    res.status(StatusCodes.OK).json(matches);
  }

  public static async show(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches: IMatch[] = await MatchService.show(Boolean(inProgress));
    res.status(StatusCodes.OK).json(matches);
  }

  public static async store(req: Request, res: Response) {
    const match: IMatch = await MatchService.store(req.body);
    res.status(StatusCodes.CREATED).json(match);
  }

  public static async updateFinished(req: Request, res: Response) {
    const { id } = req.params;
    const affectedRows = await MatchService.updateFinished(Number(id));
    if (affectedRows) {
      res.status(StatusCodes.OK).json({ message: 'Finished' });
    }
  }
}
