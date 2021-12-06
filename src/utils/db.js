import Sequelize from 'sequelize';

/**
 * Custome message validators not working so did an override.
 * See this comment: https://github.com/sequelize/sequelize/issues/1500#issuecomment-339867165
 */
Sequelize.Validator.notNull = function (item) {
  return !this.isNull(item);
};

const sequelize = new Sequelize('postgres://pqd:poketest@127.0.0.1:5433/poketest');

export { sequelize };
