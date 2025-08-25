// config/database.js - Replace your current file with this
const { Sequelize } = require('sequelize');
const path = require('path');

console.log('Loading SQLite database config...');

// Create database directory if it doesn't exist
const dbPath = path.join(__dirname, '..', 'data', 'restaurant_database.sqlite');
const fs = require('fs');
const dataDir = path.dirname(dbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Created data directory:', dataDir);
}

// SQLite configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: console.log,

  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connection established successfully.');
    console.log('📁 Database file location:', dbPath);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to SQLite database:', error);
    return false;
  }
};

const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing SQLite database...');

    await testConnection();

    // This will create tables when models are loaded
    await sequelize.sync({ force: false, alter: true });

    console.log('✅ SQLite database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  initializeDatabase,
  dbPath
};