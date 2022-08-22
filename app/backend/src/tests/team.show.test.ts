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

describe('Team | show() | GET | /teams/:id', () => {
  describe('Success', () => {

    const teamMock = {
      id: 1,
      teamName: 'Bragantino',
    }

    beforeEach(() => {
      sinon.stub(Team, 'findByPk').resolves(teamMock as Team);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams/1')

      expect(response).to.have.status(StatusCodes.OK);
    });

    it('should return a team', async () => {
      const response = await chai.request(app)
        .get('/teams/1');
      const team = response.body as ITeam;

      expect(team.id).to.equal(teamMock.id);
      expect(team.teamName).to.equal(teamMock.teamName);
    });
  });
});

