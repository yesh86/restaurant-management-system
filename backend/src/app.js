const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting minimal app...');

// CORS helper function
const setCorsHeaders = (res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
};

// Handle preflight requests globally
app.options('*', (req, res) => {
  setCorsHeaders(res);
  res.sendStatus(200);
});

// Remove all other CORS middleware - we'll handle it manually
app.use(express.json());

app.get("/cors-test", (req, res) => {
  // Set CORS headers manually
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  res.json({
    message: "CORS test endpoint",
    working: true,
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  setCorsHeaders(res);
  console.log('Root route hit');
  res.json({
    message: "Restaurant Management System API is running!",
    version: "1.0.3",
    status: "Working with simplified CORS",
    deployTime: "2025-01-08T00:55:00Z",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  setCorsHeaders(res);
  console.log('Health route hit');
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "API is healthy"
  });
});

app.get("/api/test", (req, res) => {
  setCorsHeaders(res);
  console.log('Test route hit');
  res.json({
    message: "API test successful",
    status: "working",
    timestamp: new Date().toISOString()
  });
});

// Add booking routes
app.get("/api/bookings", (req, res) => {
  setCorsHeaders(res);
  console.log('Bookings GET route hit');
  res.json({
    message: "Bookings endpoint working",
    data: [],
    count: 0,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/bookings", (req, res) => {
  setCorsHeaders(res);
  console.log('Bookings POST route hit');
  res.json({
    message: "Booking created (mock)",
    data: { id: 1, ...req.body },
    timestamp: new Date().toISOString()
  });
});

// Add other API routes your frontend needs
app.get("/api/categories", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

app.get("/api/items", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

app.get("/api/cash", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

app.get("/api/cash/summary", (req, res) => {
  setCorsHeaders(res);
  res.json({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: 0
  });
});

// Additional banquet/booking endpoints
app.get("/api/bookings/today", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

app.get("/api/bookings/upcoming", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

// Additional cash endpoints
app.post("/api/cash", (req, res) => {
  setCorsHeaders(res);
  res.json({
    message: "Cash transaction created (mock)",
    data: { id: 1, ...req.body }
  });
});

app.get("/api/cash/transactions", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

// Departments endpoint (often needed)
app.get("/api/departments", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

// Vendors endpoint (often needed)
app.get("/api/vendors", (req, res) => {
  setCorsHeaders(res);
  res.json({ data: [], count: 0 });
});

// 404 handler
app.use((req, res) => {
  setCorsHeaders(res);
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((error, req, res, next) => {
  setCorsHeaders(res);
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