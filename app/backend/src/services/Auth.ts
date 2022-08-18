import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { Jwt } from './Jwt';

export default class Auth {
  static async authenticate(credential: { email: string, password: string }) {
    const userFound = await User.findOne({
      where: {
        email: credential.email,
      },
    });

    if (userFound) {
      const passwordMatch: boolean = await bcrypt.compare(credential.password, userFound.password);

      if (!passwordMatch) {
        // throw error
        const e = new Error('Incorrect email or password');
        e.name = 'NotFoundError';
        throw e;
      }
      const token: string = Jwt.sign({ id: userFound.id, email: userFound.email });
      return { token };
    }
    const e = new Error('Incorrect email or password');
    e.name = 'NotFoundError';
    throw e;
  }
}
