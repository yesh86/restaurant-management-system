const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting minimal app...');

// Basic middleware with CORS - allow all Vercel URLs
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    // Allow any Vercel app URL or localhost
    if (origin.includes('vercel.app') || origin.includes('localhost')) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  console.log('Root route hit');
  res.json({
    message: "Restaurant Management System API is running!",
    version: "1.0.0",
    status: "Working",
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