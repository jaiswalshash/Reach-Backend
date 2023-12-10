// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const booksController = require('./booksController');
const { connect } = require('./db');

// Handle MongoDB connection errors 
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors());
app.use(booksController);

// Connect to MongoDB
connect().catch((error) => console.error(error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
