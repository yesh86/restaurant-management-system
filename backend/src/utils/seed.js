const models = require('../models');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Categories
    await models.Category.bulkCreate([
      { name: 'Vegetables', description: 'Fresh vegetables and greens', active: true },
      { name: 'Spices', description: 'Cooking spices and seasonings', active: true },
      { name: 'Dairy', description: 'Milk products and dairy items', active: true },
      { name: 'Meat', description: 'Chicken, Mutton, and other meat products', active: true },
      { name: 'Grains', description: 'Rice, wheat, and other grains', active: true }
    ], { ignoreDuplicates: true });

    console.log('✅ Categories seeded');

    // Seed Departments
    await models.Department.bulkCreate([
      { name: 'South Indian', description: 'South Indian cuisine department', active: true },
      { name: 'North Indian', description: 'North Indian cuisine department', active: true },
      { name: 'Chinese', description: 'Chinese cuisine department', active: true },
      { name: 'Banquets', description: 'Banquet and event catering', active: true }
    ], { ignoreDuplicates: true });

    console.log('✅ Departments seeded');

    // Seed Vendors
    await models.Vendor.bulkCreate([
      { name: 'Fresh Vegetables Co.', type: 'Vegetables', contact_person: 'Ravi Kumar', phone: '9876543210', active: true },
      { name: 'Poultry Farm Direct', type: 'Chicken', contact_person: 'Suresh Patel', phone: '9876543211', active: true },
      { name: 'Dairy Fresh', type: 'Milk', contact_person: 'Lakshmi Devi', phone: '9876543212', active: true }
    ], { ignoreDuplicates: true });

    console.log('✅ Vendors seeded');

    // Seed Items
    await models.Item.bulkCreate([
      { name: 'Onions', uom: 'Kgs', rate: 40.00, category_id: 1, active: true },
      { name: 'Tomatoes', uom: 'Kgs', rate: 60.00, category_id: 1, active: true },
      { name: 'Chicken', uom: 'Kgs', rate: 180.00, category_id: 4, active: true },
      { name: 'Milk', uom: 'Lts', rate: 55.00, category_id: 3, active: true }
    ], { ignoreDuplicates: true });

    console.log('✅ Items seeded');

    // Seed Sample Bookings
    await models.Booking.bulkCreate([
      {
        booking_number: 'BK001',
        customer_name: 'Rajesh Kumar',
        contact_number: '9876543210',
        email: 'rajesh@example.com',
        booking_date: '2025-07-05',
        event_type: 'Wedding',
        time_slot: 'Dinner',
        hall: 'Full Hall',
        pax: 200,
        menu_type: 'Non-Veg Standard',
        total_amount: 160000.00,
        paid_amount: 50000.00,
        status: 'Confirmed'
      }
    ], { ignoreDuplicates: true });

    console.log('✅ Bookings seeded');

    // Seed Sample Cash Transactions
    await models.CashTransaction.bulkCreate([
      {
        transaction_date: '2025-06-29',
        type: 'Cash In',
        amount: 50000.00,
        description: 'Booking advance payment - Rajesh Kumar',
        category: 'Banquet Revenue'
      },
      {
        transaction_date: '2025-06-29',
        type: 'Cash Out',
        amount: 15000.00,
        description: 'Vegetables purchase',
        category: 'Procurement'
      }
    ], { ignoreDuplicates: true });

    console.log('✅ Cash transactions seeded');
    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedData().then(() => {
    console.log('🏁 Seeding process completed.');
    process.exit(0);
  });
}

module.exports = seedData;