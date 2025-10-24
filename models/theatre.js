const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    seats: [
        {
            seatNumber: { type: String, required: true },
            isAvailable: { type: Boolean, default: true }
        }
    ]
});

const showSchema = new mongoose.Schema({
    showId: { type: String, required: true },
    movieId: { type: String, required: true },
    movieName: { type: String, required: true },
    language: { type: String, required: true },
    format: { type: String, required: true },
    timings: [{ type: String }],
    categories: [
        {
            categoryId: { type: String, required: true },
            pricePerSeat: { type: Number, required: true }
        }
    ],
    dateRange: {
        startDate: { type: Date },
        endDate: { type: Date }
    }
});

const screenSchema = new mongoose.Schema({
    screenId: { type: String, required: true },
    screenName: { type: String, required: true },
    categories: [categorySchema],
    shows: [showSchema]
});

// Theatre Schema
const theatreSchema = new mongoose.Schema({
    theatreId: { type: String, required: true, unique: true },
    theatreName: { type: String, required: true },
    location: { type: String, required: true },
    contactNumber: { type: String },
    totalScreens: { type: Number, required: true },
    screens: [screenSchema],
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;
