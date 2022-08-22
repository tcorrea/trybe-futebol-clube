import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'id', as: 'team' });

export default Team;
