import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;
import { sequelize } from '../utils/db.js';
import TeamsPokemon from './TeamsPokemon.js';

class Teams extends Model {};
Teams.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'teams'
});
Teams.hasMany(TeamsPokemon, { as: 'teams_pokemons', foreignKey: 'team_id' });

export default Teams;
