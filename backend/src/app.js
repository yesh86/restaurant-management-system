const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Restaurant Management API...');

// Simple CORS configuration - allow everything
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.sendStatus(200);
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.path} from ${req.get('Origin') || 'no origin'}`);
  next();
});

// Database initialization - ADD THIS SECTION
const { initializeModels } = require('./models');
const { initializeDatabase } = require('./config/database');

// Initialize database and models on startup
const initializeApp = async () => {
  try {
    console.log('🚀 Initializing Restaurant Management System...');

    // Initialize database connection
    await initializeDatabase();

    // Initialize all models (creates tables)
    await initializeModels();

    console.log('✅ Restaurant Management System ready!');
    console.log('🌐 Access your application at: http://localhost:5000');

  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1); // Exit if initialization fails
  }
};

// Call initialization
initializeApp();

// Test database connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const { Booking, Category, Item } = require('./models');

    const bookingCount = await Booking.count();
    const categoryCount = await Category.count();
    const itemCount = await Item.count();

    res.json({
      status: 'Database connection successful',
      tables: {
        bookings: bookingCount,
        categories: categoryCount,
        items: itemCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Restaurant Management System API is running!",
    version: "1.2.0",
    status: "SQLite Database Active",
    timestamp: new Date().toISOString(),
    cors: {
      status: "Active - All origins allowed"
    },
    endpoints: [
      "/health",
      "/api/bookings",
      "/api/categories",
      "/api/items",
      "/api/cash",
      "/api/test-db"
    ]
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.2.0",
    database: "SQLite Active",
    cors: {
      status: "Active - All origins allowed"
    }
  });
});

// Import and use actual controllers
const bookingController = require('./controllers/bookingController');

// Real booking routes using actual database
app.get('/api/bookings', bookingController.getAllBookings);
app.get('/api/bookings/date-range', bookingController.getBookingsByDateRange);
app.get('/api/bookings/:id', bookingController.getBookingById);
app.post('/api/bookings', bookingController.createBooking);
app.put('/api/bookings/:id', bookingController.updateBooking);
app.delete('/api/bookings/:id', bookingController.deleteBooking);

// Mock endpoints for other modules (until you implement them)
app.get("/api/categories", (req, res) => {
  console.log('🛍️ Categories endpoint hit');
  res.json([]);
});

app.get("/api/items", (req, res) => {
  console.log('📋 Items endpoint hit');
  res.json([]);
});

app.get("/api/cash", (req, res) => {
  console.log('💰 Cash endpoint hit');
  res.json([]);
});

app.get("/api/cash/summary", (req, res) => {
  console.log('💰 Cash summary endpoint hit');
  res.json({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: 0
  });
});

app.get("/api/bookings/today", (req, res) => {
  res.json([]);
});

app.get("/api/bookings/upcoming", (req, res) => {
  res.json([]);
});

app.post("/api/cash", (req, res) => {
  res.json({
    message: "Cash transaction created (mock)",
    data: { id: Date.now(), ...req.body }
  });
});

app.get("/api/departments", (req, res) => {
  res.json([]);
});

app.get("/api/vendors", (req, res) => {
  res.json([]);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      '/',
      '/health',
      '/api/test-db',
      '/api/bookings',
      '/api/categories',
      '/api/items',
      '/api/cash',
      '/api/cash/summary'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 API Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server locally and on Render, export for Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 Server URL: http://localhost:${PORT}`);
    console.log('\n📋 Available API Endpoints:');
    console.log(`   🔍 Health: /health`);
    console.log(`   🧪 DB Test: /api/test-db`);
    console.log(`   📦 Bookings: /api/bookings`);
    console.log(`   🛍️ Categories: /api/categories`);
    console.log(`   💰 Cash: /api/cash`);
    console.log('\n🗄️ Database: SQLite');
    console.log('🔑 CORS: All origins allowed');
    console.log(`✅ Server ready for ${process.env.NODE_ENV || 'development'} environment`);
  });
} else {
  console.log('⚡ Vercel mode - server will be handled by Vercel');
}

// Export for Vercel
module.exports = app;