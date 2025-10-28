const City = require('../models/city.model');
const PopularCity = require("../models/popularcity.model")
const State = require("../models/state.model");


exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json({
            statusCode: 0,
            message: "Cities fetched successfully",
            success: true,
            data: cities
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};


exports.createCity = async (req, res) => {
    try {
        const { cityName, popularCity } = req.body;

        const city = new City({ cityName, popularCity });
        await city.save();

        res.status(201).json({
            statusCode: 0,
            message: "City created successfully",
            success: true,
            data: city
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};



exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).json({
                statusCode: 1,
                message: "City not found",
                success: false
            });
        }
        res.status(200).json({
            statusCode: 0,
            message: "City deleted successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};

exports.getAllPopularCities = async (req, res) => {
    try {
        const cities = await PopularCity.find();
        res.status(200).json({
            statusCode: 0,
            message: "Popular cities fetched successfully",
            success: true,
            data: cities
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};


exports.createPopularCity = async (req, res) => {
    try {
        const { cityName, imageUrl } = req.body;

        const city = new PopularCity({ cityName, imageUrl });
        await city.save();

        res.status(201).json({
            statusCode: 0,
            message: "Popular city created successfully",
            success: true,
            data: city
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};


exports.deletePopularCity = async (req, res) => {
    try {
        const city = await PopularCity.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).json({
                statusCode: 1,
                message: "Popular city not found",
                success: false
            });
        }
        res.status(200).json({
            statusCode: 0,
            message: "Popular city deleted successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({ statusCode: 1, message: error.message, success: false });
    }
};


exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();

        res.status(200).json({
            statusCode: 0,
            message: "States fetched successfully",
            success: true,
            data: {
                stateDto: states
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 1,
            message: "Error fetching states",
            success: false,
            error: error.message
        });
    }
};

