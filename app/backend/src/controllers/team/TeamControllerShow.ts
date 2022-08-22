import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import service from '../../services/team/TeamServiceShow';

export default class TeamControllerShow {
  public static async show(req: Request, res: Response) {
    const { id } = req.params;
    const team = await service.show(Number(id));

    res.status(StatusCodes.OK).json(team);
  }
}
