const express = require('express');
const router = express.Router();

// Import all route modules
const userRoutes = require('./user.routes');
const cityRoutes = require('./city.routes');
const theatreRoutes = require('./theatreRoutes');
const movieRoutes = require('./movie.routes');
const uploadRoutes = require('./upload.routes'); // ✅ new

// Mount routes
router.use('/users', userRoutes);
router.use('/city', cityRoutes);
router.use('/theatres', theatreRoutes);
router.use('/movies', movieRoutes);
router.use('/uploads', uploadRoutes); // ✅ new

module.exports = router;
