const models = require('../models');
const { testConnection } = require('../config/database');

const migrate = async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Test connection first
    await testConnection();

    // Sync all models (create tables)
    await models.sequelize.sync({ force: false, alter: true });

    console.log('✅ Database migration completed successfully!');
    console.log('📋 Tables created:');
    console.log('   - categories');
    console.log('   - items');
    console.log('   - vendors');
    console.log('   - departments');
    console.log('   - bookings');
    console.log('   - enquiries');
    console.log('   - cash_transactions');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if called directly
if (require.main === module) {
  migrate().then(() => {
    console.log('🏁 Migration process completed.');
    process.exit(0);
  });
}

module.exports = migrate;