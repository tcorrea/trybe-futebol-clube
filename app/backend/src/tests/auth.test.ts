import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import User from '../database/models/User';
import AuthService from '../services/AuthService';
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

const credentialMock = {
  "email": "user@user.com",
  "password": "secret_user"
}

const invalidCredentialMock = {
  "email": "user@user.com",
  "password": "invalid-password",
}
const tokenMock = { token: 'any-token' }
const payloadMock = {
  id: 1,
  email: credentialMock.email,
  role: 'any-role',
}
// const incompleteCredentialMock = {
//   "email": "user@user.com",
// }

describe('Auth | authenticate() | POST | /login', () => {

  // let chaiHttpResponse: Response;

  describe('Success', () => {

    beforeEach(() => {
      // sinon.stub(JwtService, "sign").returns(tokenMock.token);
      sinon.stub(AuthService, "authenticate").resolves('any-token');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return a token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(credentialMock);


      expect(response.body).to.deep.equal(tokenMock);
    });
    it('should return status 200', async () => {
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
      sinon.stub(AuthService, "authenticate").throws(error);
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


describe('Auth | validate() | GET | /login/validate', () => {
  describe('Success TODO', () => {

    beforeEach(() => {
      sinon.stub(AuthService, "validate").resolves(payloadMock);
    });

    afterEach(() => {
      sinon.restore();
    });
    // TODO: Como passar o token no request
    it('should return status 200', async () => {

      const response = await chai.request(app)
        .get('/login/validate')
        .send({ 'Authorization': tokenMock.token });

      expect(response).to.have.status(200);
    });

  });
  describe('Fail TODO', () => {
    beforeEach(() => {
      const error = new Error('TODO ERROR');
      error.name = 'BAD_REQUEST';
      sinon.stub(AuthService, "validate").throws(error);
    });

    afterEach(() => {
      sinon.restore();
    });
    it('should throw an error passing invalid token', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .send({ 'Authorization': tokenMock.token });
      expect(response.status).to.equal(400);
    });
  });
});
