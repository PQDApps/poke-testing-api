import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;
import { sequelize } from '../utils/db.js';

class TeamsPokemon extends Model{};
TeamsPokemon.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  team_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  pokemon_id: {
    type: DataTypes.INTEGER
  },
  moves: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'teams_pokemons'
});

export default TeamsPokemon;
