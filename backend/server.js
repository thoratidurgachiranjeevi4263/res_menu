require('dotenv').config({ path: '../.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://restaurant-menu.onrender.com', 'https://restaurant-menu-xyz.onrender.com']
    : ['http://localhost:4200', 'http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes FIRST
const itemRoutes = require("./routes/item.routes");
app.use("/api/items", itemRoutes);

// Serve static files from Angular build
const frontendPath = path.join(__dirname, '../frontend/dist/frontend');
const browserPath = path.join(frontendPath, 'browser');

// Check if browser folder exists, fallback to main dist folder
const staticPath = require('fs').existsSync(browserPath) ? browserPath : frontendPath;
app.use(express.static(staticPath));

// Serve Angular app for all non-API routes
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    const indexPath = path.join(staticPath, 'index.html');
    res.sendFile(indexPath);
  }
});

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://226m1a4263_db_user:226m1a4263@cluster0.4qj0heh.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=RestaurantApp";

// Connect to MongoDB Atlas
async function connectDB() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Atlas Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected from MongoDB Atlas');
});

// Initialize database connection
connectDB();

const PORT = process.env.PORT || 5000;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});
