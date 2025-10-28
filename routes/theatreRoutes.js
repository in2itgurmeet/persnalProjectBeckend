const express = require('express');
const {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
} = require('../controllers/theatreController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Theatres
 *     description: Theatre management APIs (CRUD operations)
 */

/**
 * @swagger
 * /theatres/create:
 *   post:
 *     summary: Create a new theatre
 *     tags: [Theatres]
 *     description: Add a new theatre with name, location, and seating details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - location
 *               - totalSeats
 *             properties:
 *               name:
 *                 type: string
 *                 example: PVR Cinemas
 *               city:
 *                 type: string
 *                 example: Mumbai
 *               location:
 *                 type: string
 *                 example: Andheri West
 *               totalSeats:
 *                 type: number
 *                 example: 250
 *               contactNumber:
 *                 type: string
 *                 example: "9876543210"
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["3D Screen", "Dolby Sound", "Snacks Available"]
 *     responses:
 *       201:
 *         description: Theatre created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/create', createTheatre);

/**
 * @swagger
 * /theatres/getAll:
 *   get:
 *     summary: Get all theatres
 *     tags: [Theatres]
 *     description: Retrieve a list of all theatres in the system.
 *     responses:
 *       200:
 *         description: Successfully retrieved theatres
 *       500:
 *         description: Server error
 */
router.get('/getAll', getAllTheatres);

/**
 * @swagger
 * /theatres/getById/{id}:
 *   get:
 *     summary: Get theatre details by ID
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Theatre ID
 *         schema:
 *           type: string
 *           example: 653ad28f3b2d4c44f1a23b10
 *     responses:
 *       200:
 *         description: Theatre details retrieved successfully
 *       404:
 *         description: Theatre not found
 *       500:
 *         description: Server error
 */
router.get('/getById/:id', getTheatreById);

/**
 * @swagger
 * /theatres/update/{id}:
 *   put:
 *     summary: Update theatre details
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Theatre ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: INOX Multiplex
 *               city:
 *                 type: string
 *                 example: Delhi
 *               location:
 *                 type: string
 *                 example: Connaught Place
 *               totalSeats:
 *                 type: number
 *                 example: 300
 *     responses:
 *       200:
 *         description: Theatre updated successfully
 *       404:
 *         description: Theatre not found
 *       500:
 *         description: Server error
 */
router.put('/update/:id', updateTheatre);

/**
 * @swagger
 * /theatres/delete/{id}:
 *   delete:
 *     summary: Delete a theatre
 *     tags: [Theatres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Theatre ID
 *         schema:
 *           type: string
 *           example: 653ad28f3b2d4c44f1a23b10
 *     responses:
 *       200:
 *         description: Theatre deleted successfully
 *       404:
 *         description: Theatre not found
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', deleteTheatre);

module.exports = router;
