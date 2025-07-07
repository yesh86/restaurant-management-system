const { Sequelize } = require('sequelize');
const path = require('path');

// Remove the fs.mkdirSync line that's causing the error!

let sequelize;

if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // Use in-memory SQLite for Vercel/production
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // This creates an in-memory database
    logging: false, // Disable logging in production
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Development - use file-based SQLite
  const fs = require('fs');
  const dbDir = path.join(__dirname, '../database');

  // Only create directory in development
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(dbDir, 'ims.db'),
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    throw error;
  }
};

module.exports = { sequelize, testConnection };