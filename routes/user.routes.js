const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser } = require('..//controllers/user.controller');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Update profile
router.put('/update/:id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

module.exports = router;
