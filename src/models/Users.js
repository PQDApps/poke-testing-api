import pkg from 'sequelize';
const { Sequelize, Model, DataTypes } = pkg;
import { sequelize } from '../utils/db.js';
import Hearts from './Hearts.js';

class Users extends Model {};
Users.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  google_id: {
    type: DataTypes.STRING
  },
  facebook_id: {
    type: DataTypes.STRING
  },
  displayname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'users'
});
Users.hasMany(Hearts, { as: 'hearts', foreignKey: 'user_id' });

export default Users;
