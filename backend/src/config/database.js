const { Sequelize } = require('sequelize');

console.log('Loading database config...');

let sequelize;

if (process.env.POSTGRES_URL) {
  // Use Vercel Postgres
  console.log('Using Vercel Postgres database');
  sequelize = new Sequelize(process.env.POSTGRES_URL, {
    logging: false,
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
} else if (process.env.DATABASE_URL) {
  // Use any other database URL
  console.log('Using DATABASE_URL');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  });
} else {
  // Fallback - this shouldn't happen in production
  console.log('No database URL found, this will likely fail');
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'test',
    logging: false
  });
}

console.log('Database configured successfully');

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