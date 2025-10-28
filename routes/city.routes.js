const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');

/**
 * @swagger
 * tags:
 *   - name: City
 *     description: City management APIs
 *   - name: PopularCity
 *     description: Popular city management APIs
 *   - name: State
 *     description: State related APIs
 */

/**
 * @swagger
 * /city/city:
 *   get:
 *     summary: Get all cities
 *     tags: [City]
 *     description: Retrieve a list of all cities in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved city list
 *       500:
 *         description: Server error
 */
router.get('/city', cityController.getAllCities);

/**
 * @swagger
 * /city/create:
 *   post:
 *     summary: Create a new city
 *     tags: [City]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cityName
 *               - state
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: Mumbai
 *               state:
 *                 type: string
 *                 example: Maharashtra
 *     responses:
 *       201:
 *         description: City created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/create', cityController.createCity);

/**
 * @swagger
 * /city/{id}:
 *   delete:
 *     summary: Delete a city by ID
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: City ID
 *         schema:
 *           type: string
 *           example: 653ad28f3b2d4c44f1a23b10
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 */
router.delete('/:id', cityController.deleteCity);

/**
 * @swagger
 * /city/popularcity/create:
 *   post:
 *     summary: Create a popular city entry
 *     tags: [PopularCity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cityName
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: Delhi
 *     responses:
 *       201:
 *         description: Popular city added
 *       400:
 *         description: Invalid input
 */
router.post('/popularcity/create', cityController.createPopularCity);

/**
 * @swagger
 * /city/popularcity/getAll:
 *   get:
 *     summary: Get all popular cities
 *     tags: [PopularCity]
 *     responses:
 *       200:
 *         description: List of popular cities
 *       500:
 *         description: Server error
 */
router.get('/popularcity/getAll', cityController.getAllPopularCities);

/**
 * @swagger
 * /city/popularcity/{id}:
 *   post:
 *     summary: Delete a popular city by ID
 *     tags: [PopularCity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Popular City ID
 *         schema:
 *           type: string
 *           example: 653ad28f3b2d4c44f1a23b10
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.post('/popularcity/:id', cityController.deletePopularCity);

/**
 * @swagger
 * /city/state:
 *   get:
 *     summary: Get all states
 *     tags: [State]
 *     responses:
 *       200:
 *         description: List of all states
 *       500:
 *         description: Server error
 */
router.get('/state', cityController.getAllStates);

module.exports = router;
