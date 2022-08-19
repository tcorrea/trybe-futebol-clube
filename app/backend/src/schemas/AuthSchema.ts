import * as Joi from 'joi';
import IAuth from '../interfaces/IAuth';

export default class AuthSchema {
  public static validate(body: IAuth): Joi.ValidationResult {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(body);
  }
}
