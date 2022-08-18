import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export default class Jwt {
  static sign(payload: { id: number, email: string }): string {
    return sign(payload, process.env.JWT_SECRET || 'secret');
  }
}
