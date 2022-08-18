import { sign } from 'jsonwebtoken';

export default class Jwt {
  static sign(payload: { id: number, email: string }): string {
    return sign(payload, 'secret');
  }
}
