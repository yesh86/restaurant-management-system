const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting minimal app...');

// Manual CORS middleware
app.use((req, res, next) => {
  console.log(`CORS: ${req.method} ${req.path} from ${req.get('Origin')}`);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    console.log('CORS: Responding to OPTIONS request');
    res.sendStatus(200);
  } else {
    next();
  }
});

// Basic middleware with explicit CORS configuration
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(express.json());

// Test route
app.get("/debug-cors", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.json({
    message: "Manual CORS headers test",
    origin: req.get('Origin'),
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  console.log('Root route hit');
  res.set('Access-Control-Allow-Origin', '*'); // Manual header for root too
  res.json({
    message: "Restaurant Management System API is running!",
    version: "1.0.1", // Changed version to test deployment
    status: "Working with manual CORS",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  console.log('Health route hit');
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "API is healthy"
  });
});

app.get("/api/test", (req, res) => {
  console.log('Test route hit');
  res.json({
    message: "API test successful",
    status: "working",
    timestamp: new Date().toISOString()
  });
});

// Add booking routes
app.get("/api/bookings", (req, res) => {
  console.log('Bookings GET route hit');
  res.json({
    message: "Bookings endpoint working",
    data: [],
    count: 0,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/bookings", (req, res) => {
  console.log('Bookings POST route hit');
  res.json({
    message: "Booking created (mock)",
    data: { id: 1, ...req.body },
    timestamp: new Date().toISOString()
  });
});

// Add other API routes your frontend needs
app.get("/api/categories", (req, res) => {
  res.json({ data: [], count: 0 });
});

app.get("/api/items", (req, res) => {
  res.json({ data: [], count: 0 });
});

app.get("/api/cash", (req, res) => {
  res.json({ data: [], count: 0 });
});

app.get("/api/cash/summary", (req, res) => {
  res.json({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: 0
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

console.log('App configuration complete');

// Export for Vercel
module.exports = app;