const { Sequelize } = require('sequelize');

console.log('Loading database config...');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

console.log('Sequelize configured for in-memory SQLite');

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

module.exports = { sequelize, testConnection };