import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';

import ITeam from '../interfaces/team/ITeam';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET | /teams | index', () => {
  describe('Success', () => {

    const teamMock = {
      id: 1,
      teamName: 'Bragantino',
    }

    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves([teamMock as Team]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams')

      expect(response).to.have.status(StatusCodes.OK);
    });

    it('should return teams', async () => {
      const response = await chai.request(app)
        .get('/teams');
      const [team] = response.body as ITeam[];

      expect(team.id).to.equal(teamMock.id);
      expect(team.teamName).to.equal(teamMock.teamName);
    });
  });
});

