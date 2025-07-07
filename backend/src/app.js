const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [
        'https://your-frontend-domain.vercel.app', // Replace with your actual frontend URL
        'https://your-custom-domain.com' // Add any custom domains
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173', // for Vite
        'http://localhost:4173'  // for Vite preview
      ]
}));
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

      // For production, use safer sync options
      if (process.env.NODE_ENV === 'production') {
        // In production, only sync without altering tables
        await models.sequelize.sync({ alter: false });
        console.log('🗄️ Database synchronized (production mode)');
      } else {
        // Development mode - try alter first, fallback to force if it fails
        try {
          await models.sequelize.sync({ alter: true });
          console.log('🗄️ Database synchronized with all tables');
        } catch (alterError) {
          console.log('⚠️ Alter sync failed, using force sync...');
          await models.sequelize.sync({ force: true });
          console.log('🗄️ Database force synchronized - all tables recreated');

          // Re-run seed after force sync
          try {
            const seedData = require('./utils/seed');
            await seedData();
            console.log('🌱 Seed data reloaded');
          } catch (seedError) {
            console.log('⚠️ Seed failed, but database is ready');
          }
        }
      }

    } catch (error) {
      console.error('❌ Database sync failed:', error.message);
    }
  };

  // Only initialize database if not in Vercel build process
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL_ENV) {
    initializeDatabase();
  }

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
    environment: process.env.NODE_ENV || 'development',
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
    apis: "Active",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database test route
app.get("/api/test", async (req, res) => {
  try {
    const models = require('./config/database').mockModels;

    const categoryCount = await models.Category.count();
    const itemCount = await models.Item.count();
    // ... etc

    res.json({
      message: "Database test successful - All tables and APIs ready (TEST MODE)",
      data: {
        categories: categoryCount,
        items: itemCount,
        vendors: 0,
        departments: 0,
        bookings: 0,
        enquiries: 0,
        cash_transactions: 0
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

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
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
}

// Export the app for Vercel
module.exports = app;"// Force fresh deployment $(date)" 
