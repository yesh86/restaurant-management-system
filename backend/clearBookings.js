// Script to clear all bookings from the database
const { sequelize, Booking } = require('./src/models');

async function clearAllBookings() {
  try {
    console.log('🗑️  Starting to clear all bookings...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Count bookings before deletion
    const count = await Booking.count();
    console.log(`📊 Found ${count} bookings to delete`);

    if (count === 0) {
      console.log('ℹ️  No bookings to delete');
      process.exit(0);
    }

    // Delete all bookings
    const deleted = await Booking.destroy({
      where: {},
      truncate: true
    });

    console.log(`✅ Successfully deleted ${deleted} bookings`);
    console.log('🎉 Database cleared! You can now start fresh.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing bookings:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the function
clearAllBookings();