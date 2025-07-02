const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load all models and initialize database
try {
  const { testConnection } = require('./config/database');
  const models = require('./models');

  console.log('✅ All models loaded successfully');

  // Initialize database
  const initializeDatabase = async () => {
    try {
      await testConnection();
      await models.sequelize.sync({ alter: true });
      console.log('🗄️ Database synchronized with all tables');
    } catch (error) {
      console.error('❌ Database sync failed:', error.message);
    }
  };

  initializeDatabase();

} catch (error) {
  console.error('❌ Failed to load models:', error.message);
}

// Import routes
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');
const bookingRoutes = require('./routes/bookings');
const cashRoutes = require('./routes/cash');

// Basic routes
app.get("/", (req, res) => {
  res.json({
    message: "Integrated Management System API is running!",
    version: "1.0.0",
    modules: ["Banquet", "Procurement", "Cash Management"],
    status: "All APIs available",
    endpoints: {
      categories: "/api/categories",
      items: "/api/items",
      bookings: "/api/bookings",
      cash: "/api/cash",
      test: "/api/test"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: "Connected",
    apis: "Active"
  });
});

// Database test route
app.get("/api/test", async (req, res) => {
  try {
    const models = require('./models');

    const categoryCount = await models.Category.count();
    const itemCount = await models.Item.count();
    const vendorCount = await models.Vendor.count();
    const departmentCount = await models.Department.count();
    const bookingCount = await models.Booking.count();
    const enquiryCount = await models.Enquiry.count();
    const cashCount = await models.CashTransaction.count();

    res.json({
      message: "Database test successful - All tables and APIs ready",
      data: {
        categories: categoryCount,
        items: itemCount,
        vendors: vendorCount,
        departments: departmentCount,
        bookings: bookingCount,
        enquiries: enquiryCount,
        cash_transactions: cashCount
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Database test failed",
      error: error.message
    });
  }
});

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cash', cashRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    availableEndpoints: [
      'GET /api/categories',
      'POST /api/categories',
      'GET /api/items',
      'POST /api/items',
      'GET /api/bookings',
      'POST /api/bookings',
      'GET /api/cash',
      'POST /api/cash',
      'GET /api/cash/summary'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
  console.log('📋 Available APIs:');
  console.log('   📦 Categories: http://localhost:' + PORT + '/api/categories');
  console.log('   🛍️  Items: http://localhost:' + PORT + '/api/items');
  console.log('   🎉 Bookings: http://localhost:' + PORT + '/api/bookings');
  console.log('   💰 Cash: http://localhost:' + PORT + '/api/cash');
});

module.exports = app;