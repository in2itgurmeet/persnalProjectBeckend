const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        trim: true
    },
    popularCity: {
        type: Boolean,
        default: false   
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('City', citySchema);
