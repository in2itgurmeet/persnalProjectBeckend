const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const jwtUtil = require('../config/jwt'); // JWT middleware

// Create movie (only for logged in users)
router.post('/create', jwtUtil.verifyToken, movieController.createMovie);

// Get all movies
router.get('/', movieController.getMovies);

// Get single movie by ID
router.get('/:id', movieController.getMovieById);

// Update movie by ID (only owner/admin)
router.put('/:id', jwtUtil.verifyToken, movieController.updateMovie);

// Delete movie by ID (only owner/admin)
router.delete('/:id', jwtUtil.verifyToken, movieController.deleteMovie);
router.patch('/:id/like', jwtUtil.verifyToken, movieController.likeMovie);
router.patch('/:id/rate', jwtUtil.verifyToken, movieController.rateMovie);
module.exports = router;
