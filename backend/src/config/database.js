const { Sequelize } = require('sequelize');

console.log('Loading database config...');
console.log('Environment variables check:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

let sequelize;

// Check multiple possible environment variable names
const databaseUrl = process.env.DATABASE_URL ||
                   process.env.POSTGRES_URL ||
                   process.env.POSTGRES_PRISMA_URL ||
                   process.env.POSTGRES_URL_NON_POOLING;

if (databaseUrl) {
  console.log('Using database URL (first 20 chars):', databaseUrl.substring(0, 20) + '...');

  sequelize = new Sequelize(databaseUrl, {
    logging: console.log, // Enable logging to see what's happening
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  console.log('❌ No database URL found in environment variables');
  console.log('Available env vars:', Object.keys(process.env).filter(key =>
    key.includes('DATABASE') || key.includes('POSTGRES')
  ));

  // Create a dummy sequelize to prevent crashes
  sequelize = new Sequelize('postgres://user:pass@localhost:5432/dummy', {
    logging: false
  });
}

console.log('Database configured');

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Connection details:', {
      host: sequelize.config.host,
      port: sequelize.config.port,
      database: sequelize.config.database,
      username: sequelize.config.username
    });
    throw error;
  }
};

module.exports = { sequelize, testConnection };