const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    age: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
});

// Create and export the User model based on the schema
module.exports = mongoose.model('User', userSchema);

