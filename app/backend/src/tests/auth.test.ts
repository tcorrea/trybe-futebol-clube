
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/User';
import Auth from '../services/Auth';
import IToken from '../interfaces/IToken';
// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// const userMock: IUser = {
//   id: 1,
//   username: 'any-name',
//   role: 'any-role',
//   email: 'any-email',
//   password: 'any-hash',
// }

const tokenMock: IToken = {
  token: 'any-token',
}

const credentialMock = {
  "email": "user@user.com",
  "password": "secret_user"
}

const invalidCredentialMock = {
  "email": "user@user.com",
  "password": ""
}

describe('Login', () => {

  // let chaiHttpResponse: Response;

  describe('Success', () => {

    beforeEach(() => {
      sinon.stub(Auth, "authenticate").resolves(tokenMock as IToken);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return a token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(credentialMock);

      expect(response.status).to.equal(200);
    });
  });

  describe('Fail', () => {

    beforeEach(() => {
      const error = new Error('Incorrect email or password');
      error.name = 'UNAUTHORIZED';
      sinon.stub(Auth, "authenticate").throws(error);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should throw an error passing invalid credential', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(invalidCredentialMock);
      expect(response.status).to.equal(401);
    });
  });

});
