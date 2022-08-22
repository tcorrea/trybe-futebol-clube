import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import service from '../../services/team/TeamServiceIndex';

export default class TeamControllerIndex {
  public static async index(_req: Request, res: Response) {
    const teams = await service.index();
    res.status(StatusCodes.OK).json(teams);
  }
}
