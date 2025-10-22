const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./user.routes');
const cityRoutes = require('./city.routes');
const theatreRoutes = require('./theatreRoutes')
// Mount routes
router.use('/users', userRoutes);
router.use('/city',cityRoutes)
router.use('/theatres',theatreRoutes)


module.exports = router;
