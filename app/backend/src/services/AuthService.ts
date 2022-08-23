import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import Jwt from './Jwt';
import IAuth from '../interfaces/IAuth';
import IPayload from '../interfaces/IPayload';

export default class AuthService {
  static async authenticate(credential: IAuth): Promise<string> {
    const userFound = await User.findOne({
      where: { email: credential.email },
    });
    const e = new Error('Incorrect email or password');
    e.name = 'UNAUTHORIZED';
    if (userFound) {
      const passwordMatch: boolean = await bcrypt.compare(
        credential.password,
        userFound.password,
      );
      const { id, email, role } = userFound;
      if (!passwordMatch) {
        throw e;
      }
      return Jwt.sign({ id, email, role });
    }
    throw e;
  }

  static validate(authorization: string | undefined): IPayload {
    if (authorization) {
      return Jwt.verify(authorization) as IPayload;
    }
    // TODO: criar erro para token invalido
    const e = new Error('TODO ERROR');
    e.name = 'BAD_REQUEST';
    throw e;
  }
}
