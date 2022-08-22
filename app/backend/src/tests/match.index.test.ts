import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';

// import IMatch from '../interfaces/match/IMatch';
// import IDisplayMatch from '../interfaces/match/IDisplayMatch';
// import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match | index() | GET | /matches ', () => {

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
      // sinon.stub(Match, 'findAll').resolves([matchMock as IDisplayMatch]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches')

      expect(response).to.have.status(StatusCodes.OK);
    });

    // it('should return matches', async () => {
    //   const response = await chai.request(app)
    //     .get('/matches');
    //   const [match] = response.body as IDisplayMatch[];

    //   expect(match.id).to.equal(matchMock.id);
    //   expect(match.awayTeamGoals).to.equal(match.awayTeamGoals);
    // });
  });
});
