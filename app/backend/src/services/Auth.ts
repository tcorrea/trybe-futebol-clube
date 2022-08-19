import * as bcrypt from 'bcryptjs';
import IToken from '../interfaces/IToken';
import User from '../database/models/User';
import Jwt from './Jwt';
import IAuth from '../interfaces/IAuth';

export default class Auth {
  static async authenticate(credential: IAuth): Promise<IToken> {
    const userFound = await User.findOne({
      where: {
        email: credential.email,
      },
    });

    if (userFound) {
      const passwordMatch: boolean = await bcrypt.compare(credential.password, userFound.password);

      if (!passwordMatch) {
        const e = new Error('Incorrect email or password');
        e.name = 'UNAUTHORIZED';
        throw e;
      }
      const token: string = Jwt.sign({
        id: userFound.id,
        email: userFound.email,
        role: userFound.role,
      });
      return { token };
    }
    const e = new Error('Incorrect email or password');
    e.name = 'UNAUTHORIZED';
    throw e;
  }

  static validate(authorization: string | undefined) {
    if (authorization) {
      const teste = Jwt.verify(authorization);
      console.log(teste);
      return teste;
    }
  }
}
