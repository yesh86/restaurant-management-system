const { sequelize } = require('./src/config/database');

const fixBookingTable = async () => {
  try {
    console.log('🔄 Fixing booking table...');

    // Get existing data
    const existingBookings = await sequelize.query(
      'SELECT * FROM bookings',
      { type: sequelize.QueryTypes.SELECT }
    );

    console.log(`📊 Found ${existingBookings.length} existing bookings`);

    // Drop and recreate the bookings table
    await sequelize.query('DROP TABLE IF EXISTS bookings');
    console.log('🗑️ Dropped old bookings table');

    // Create new table with all fields
    await sequelize.query(`
      CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_number VARCHAR(20) NOT NULL UNIQUE,
        customer_name VARCHAR(200) NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        email VARCHAR(200),
        booking_date DATE NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        other_event_details VARCHAR(500),
        time_slot VARCHAR(20) NOT NULL,
        hall VARCHAR(20) NOT NULL,
        pax INTEGER NOT NULL,
        menu_type VARCHAR(50),
        menu_price DECIMAL(10,2),
        total_amount DECIMAL(10,2) DEFAULT 0,
        advance1_amount DECIMAL(10,2) DEFAULT 0,
        advance1_date DATE,
        advance1_method VARCHAR(20) DEFAULT 'Cash',
        advance2_amount DECIMAL(10,2) DEFAULT 0,
        advance2_date DATE,
        advance2_method VARCHAR(20) DEFAULT 'Cash',
        advance3_amount DECIMAL(10,2) DEFAULT 0,
        advance3_date DATE,
        advance3_method VARCHAR(20) DEFAULT 'Cash',
        final_amount DECIMAL(10,2) DEFAULT 0,
        final_date DATE,
        final_method VARCHAR(20) DEFAULT 'Cash',
        paid_amount DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'Confirmed',
        notes TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created new bookings table with all fields');

    // Restore existing data with default values for new fields
    if (existingBookings.length > 0) {
      for (const booking of existingBookings) {
        await sequelize.query(`
          INSERT INTO bookings (
            booking_number, customer_name, contact_number, email, booking_date,
            event_type, time_slot, hall, pax, menu_type, total_amount, paid_amount,
            status, notes, created_at, updated_at,
            other_event_details, menu_price,
            advance1_amount, advance1_date, advance1_method,
            advance2_amount, advance2_date, advance2_method,
            advance3_amount, advance3_date, advance3_method,
            final_amount, final_date, final_method
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, {
          replacements: [
            booking.booking_number,
            booking.customer_name,
            booking.contact_number,
            booking.email,
            booking.booking_date,
            booking.event_type,
            booking.time_slot,
            booking.hall,
            booking.pax,
            booking.menu_type,
            booking.total_amount || 0,
            booking.paid_amount || 0,
            booking.status || 'Confirmed',
            booking.notes,
            booking.created_at || new Date(),
            booking.updated_at || new Date(),
            // New fields with default values
            null, // other_event_details
            null, // menu_price
            0, null, 'Cash', // advance1
            0, null, 'Cash', // advance2
            0, null, 'Cash', // advance3
            0, null, 'Cash'  // final
          ]
        });
      }
      console.log(`📦 Restored ${existingBookings.length} bookings with new structure`);
    }

    console.log('🎉 Booking table fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing booking table:', error);
  } finally {
    await sequelize.close();
  }
};

fixBookingTable();