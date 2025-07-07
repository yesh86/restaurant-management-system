const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting minimal app...');

// Basic middleware
app.use(cors());
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