const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./user.routes');
const cityRoutes = require('./city.routes')
// Mount routes
router.use('/users', userRoutes);
router.use('/city',cityRoutes)


module.exports = router;
