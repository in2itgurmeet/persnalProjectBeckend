const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');

// Routes
router.get('/city', cityController.getAllCities);
router.post('/create', cityController.createCity);
router.delete('/:id', cityController.deleteCity);

// popularcity 
router.post('/popularcity/create', cityController.createPopularCity);
router.get('/popularcity/getAll', cityController.getAllPopularCities);
router.post('/popularcity/:id', cityController.deletePopularCity);
// state
router.get('/state',cityController.getAllStates)



module.exports = router;
