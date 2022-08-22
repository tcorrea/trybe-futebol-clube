import { Request, Response } from 'express';
import service from '../services/AuthService';

export default class AuthController {
  static async authenticate(req: Request, res: Response) {
    const token: string = await service.authenticate(req.body);
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { role } = service.validate(authorization);
    res.status(200).json({ role });
  }
}
