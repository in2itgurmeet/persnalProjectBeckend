const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const jwtUtil = require('../config/jwt');

router.post('/create', jwtUtil.verifyToken, movieController.createMovie);
router.get('/getAll', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.put('/update/:id', jwtUtil.verifyToken, movieController.updateMovie);
router.delete('/:id', jwtUtil.verifyToken, movieController.deleteMovie);
router.patch('/:id/like', jwtUtil.verifyToken, movieController.likeMovie);
router.patch('/:id/rate', jwtUtil.verifyToken, movieController.rateMovie);

module.exports = router;
