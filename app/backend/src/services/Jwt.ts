import { sign, verify, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

export default class Jwt {
  static sign(payload: { id: number, email: string, role: string }): string {
    return sign(payload, process.env.JWT_SECRET || 'secret');
  }
  static verify(token: string) {
    return verify(token, process.env.JWT_SECRET || 'secret');
    // const jwtPayload: JwtPayload | string = verify(token, process.env.JWT_SECRET || 'secret')
    // return jwtPayload;
  }
}
