import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

// import Match from '../database/models/Match';
// import IDisplayMatch from '../interfaces/match/IDisplayMatch';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match | show() | GET | /matches?inProgress=true', () => {

  // const matchMock = {
  //   "id": 1,
  //   "homeTeam": 16,
  //   "homeTeamGoals": 1,
  //   "awayTeam": 8,
  //   "awayTeamGoals": 1,
  //   "inProgress": false,
  //   "teamHome": {
  //     "teamName": "São Paulo"
  //   },
  //   "teamAway": {
  //     "teamName": "Grêmio"
  //   }
  // };

  describe('Success', () => {
    beforeEach(() => {
      // sinon.stub(Match, 'findAll').resolves([matchMock as Match]);
      // sinon.stub(Match, 'findAll').resolves([matchMock as IDisplayMatch]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches?inProgress=true');

      expect(response).to.have.status(StatusCodes.OK);
    });

  });


});
