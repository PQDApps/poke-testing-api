import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;
import { sequelize } from '../utils/db.js';

class Hearts extends Model {};
Hearts.init({
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  pokemon_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  hearted: {
    type: Sequelize.BOOLEAN
  }
},{
  sequelize,
  modelName: 'hearts'
});

Hearts.removeAttribute('id');

export default Hearts;
