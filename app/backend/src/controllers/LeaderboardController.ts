import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async home(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.home();
    res.status(StatusCodes.OK).json(leaderboard);
  }
}
