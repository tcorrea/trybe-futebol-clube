import { Request, Response, NextFunction } from 'express';
import AuthSchema from '../schemas/AuthSchema';

export default class AuthMiddleware {
  public static validate(req: Request, _res: Response, next: NextFunction): void {
    const { error } = AuthSchema.validate(req.body);
    if (error) {
      const e = new Error('All fields must be filled');
      e.name = 'BAD_REQUEST';
      throw e;
    }
    next();
  }
}
