const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const jwtUtil = require('../config/jwt');

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movie management and user interactions
 */

/**
 * @swagger
 * /movies/create:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     description: Add a new movie to the database (Admin only).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - language
 *               - genre
 *               - duration
 *               - releaseDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: AvengersEndgame
 *               description:
 *                 type: string
 *                 example: Heroes unite to defeat Thanos.
 *               language:
 *                 type: string
 *                 example: English
 *               genre:
 *                 type: string
 *                 example: Action
 *               duration:
 *                 type: number
 *                 example: 180
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: 2019-04-26
 *               poster:
 *                 type: string
 *                 example: https://imageurl.com/poster.jpg
 *               rating:
 *                 type: number
 *                 example: 0
 *               likes:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid data
 */
router.post('/create', jwtUtil.verifyToken, movieController.createMovie);

/**
 * @swagger
 * /movies/getAll:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     description: Retrieve all movies with details.
 *     responses:
 *       200:
 *         description: List of movies retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/getAll', movieController.getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *           example: 653ad28f3b2d4c44f1a23b10
 *     responses:
 *       200:
 *         description: Movie details retrieved
 *       404:
 *         description: Movie not found
 */
router.get('/:id', movieController.getMovieById);

/**
 * @swagger
 * /movies/update/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               description:
 *                 type: string
 *                 example: Updated movie description.
 *               genre:
 *                 type: string
 *                 example: Action
 *               duration:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */
router.put('/update/:id', jwtUtil.verifyToken, movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
router.delete('/:id', jwtUtil.verifyToken, movieController.deleteMovie);

/**
 * @swagger
 * /movies/{id}/like:
 *   patch:
 *     summary: Like a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie liked successfully
 *       404:
 *         description: Movie not found
 */
router.patch('/:id/like', jwtUtil.verifyToken, movieController.likeMovie);

/**
 * @swagger
 * /movies/{id}/rate:
 *   patch:
 *     summary: Rate a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Movie rated successfully
 *       404:
 *         description: Movie not found
 */
router.patch('/:id/rate', jwtUtil.verifyToken, movieController.rateMovie);

module.exports = router;
