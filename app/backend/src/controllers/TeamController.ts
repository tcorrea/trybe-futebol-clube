import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static async index(_req: Request, res: Response) {
    const teams = await TeamService.index();
    res.status(StatusCodes.OK).json(teams);
  }

  public static async show(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.show(Number(id));
    res.status(StatusCodes.OK).json(team);
  }
}
