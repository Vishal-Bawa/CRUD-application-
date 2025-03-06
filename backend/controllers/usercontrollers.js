const User = require('../models/userModel.js'); // Import the User model

// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with that email!" });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            age
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the newly created user
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

