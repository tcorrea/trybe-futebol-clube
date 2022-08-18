import { Request, Response } from 'express';
import IToken from '../interfaces/IToken';
import service from '../services/Auth';

export default class Auth {
  static async authenticate(req: Request, res: Response) {
    const token: IToken | undefined = await service.authenticate(req.body);
    res.status(200).json(token);//.redirect('/matches');
  }
}
