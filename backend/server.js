const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js'); // Import the user routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cruddb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Use the user routes
app.use('/api', userRoutes); // All user-related routes will now be prefixed with '/api'

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});

