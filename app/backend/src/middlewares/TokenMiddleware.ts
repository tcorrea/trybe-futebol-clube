import { Request, Response, NextFunction } from 'express';
import Jwt from '../services/Jwt';

export default class TokenMiddleware {
  public static validate(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('TODO');
    }
    // const payload = Jwt.verify(authorization);
    Jwt.verify(authorization);

    next();
  }
}
