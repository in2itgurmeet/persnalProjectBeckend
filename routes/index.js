const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./user.routes');

// Mount routes
router.use('/users', userRoutes);


module.exports = router;
