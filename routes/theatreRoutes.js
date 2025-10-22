const express = require('express');
const {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
} = require('../controllers/theatreController');

const router = express.Router();

// Routes
router.post('/create', createTheatre);
router.get('/getAll', getAllTheatres);
router.get('/getById/:id', getTheatreById);
router.put('/update/:id', updateTheatre);
router.delete('/delete/:id', deleteTheatre);

module.exports = router;
