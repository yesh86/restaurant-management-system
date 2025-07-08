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

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Restaurant Management System API is running!",
    version: "1.1.2",
    status: "Wildcard CORS - Allow All Origins",
    timestamp: new Date().toISOString(),
    cors: {
      status: "Active - All origins allowed"
    },
    endpoints: [
      "/health",
      "/api/bookings",
      "/api/categories",
      "/api/items",
      "/api/cash"
    ]
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.1.1",
    cors: {
      status: "Active - All Vercel domains allowed"
    }
  });
});

// API routes group
const apiRouter = express.Router();

// Booking endpoints
apiRouter.get("/bookings", (req, res) => {
  console.log('📦 Bookings endpoint hit');
  res.json([
    {
      id: 1,
      customer_name: "Sample Customer",
      event_type: "Wedding",
      booking_date: "2025-01-15",
      pax: 100,
      total_amount: 50000,
      status: "Confirmed",
      contact_number: "9876543210",
      time_slot: "6:00 PM - 10:00 PM",
      hall: "Main Hall"
    },
    {
      id: 2,
      customer_name: "Test User",
      event_type: "Birthday Party",
      booking_date: "2025-01-20",
      pax: 50,
      total_amount: 25000,
      status: "Pending",
      contact_number: "9876543211",
      time_slot: "12:00 PM - 4:00 PM",
      hall: "Side Hall"
    }
  ]);
});

apiRouter.post("/bookings", (req, res) => {
  console.log('📦 Create booking request');
  res.json({
    message: "Booking created (mock)",
    data: { id: Date.now(), ...req.body },
    timestamp: new Date().toISOString()
  });
});

// Other API endpoints
apiRouter.get("/categories", (req, res) => {
  console.log('🛍️ Categories endpoint hit');
  res.json([]);
});

apiRouter.get("/items", (req, res) => {
  console.log('📋 Items endpoint hit');
  res.json([]);
});

apiRouter.get("/cash", (req, res) => {
  console.log('💰 Cash endpoint hit');
  res.json([]);
});

apiRouter.get("/cash/summary", (req, res) => {
  console.log('💰 Cash summary endpoint hit');
  res.json({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: 0
  });
});

apiRouter.get("/bookings/today", (req, res) => {
  res.json([]);
});

apiRouter.get("/bookings/upcoming", (req, res) => {
  res.json([]);
});

apiRouter.post("/cash", (req, res) => {
  res.json({
    message: "Cash transaction created (mock)",
    data: { id: Date.now(), ...req.body }
  });
});

apiRouter.get("/departments", (req, res) => {
  res.json([]);
});

apiRouter.get("/vendors", (req, res) => {
  res.json([]);
});

// Mount API router
app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      '/',
      '/health',
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

// Start server locally, export for Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 Local: http://localhost:${PORT}`);
    console.log('\n📋 Available API Endpoints:');
    console.log(`   🔍 Health: http://localhost:${PORT}/health`);
    console.log(`   📦 Bookings: http://localhost:${PORT}/api/bookings`);
    console.log(`   🛍️ Categories: http://localhost:${PORT}/api/categories`);
    console.log(`   💰 Cash: http://localhost:${PORT}/api/cash`);
    console.log('\n🔒 CORS: All Vercel domains and localhost allowed');
  });
} else {
  console.log('⚡ Production mode - server will be handled by Vercel');
}

// Export for Vercel
module.exports = app;