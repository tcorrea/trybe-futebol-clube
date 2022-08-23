import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

export default class Jwt {
  static sign(payload: { id: number, email: string, role: string }): string {
    return sign(payload, process.env.JWT_SECRET || 'secret');
  }

  static verify(token: string) {
    try {
      return verify(token, process.env.JWT_SECRET || 'secret');
    } catch (e) {
      const error = new Error('Token must be a valid token');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }
}
