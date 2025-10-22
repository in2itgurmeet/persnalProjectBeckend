const Theatre = require("../models/theatre");

// ✅ Create Theatre
exports.createTheatre = async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        const savedTheatre = await newTheatre.save();
        res.status(201).json({
            message: "Theatre created successfully",
            theatre: savedTheatre,
        });
    } catch (error) {
        console.error("Error creating theatre:", error);
        res.status(500).json({ message: "Error creating theatre", error: error.message });
    }
};

// ✅ Get all Theatres
exports.getAllTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find();
        res.status(200).json(theatres);
    } catch (error) {
        res.status(500).json({ message: "Error fetching theatres", error: error.message });
    }
};

// ✅ Get Theatre by ID
exports.getTheatreById = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.id);
        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }
        res.status(200).json(theatre);
    } catch (error) {
        res.status(500).json({ message: "Error fetching theatre", error: error.message });
    }
};

// ✅ Update Theatre
exports.updateTheatre = async (req, res) => {
    try {
        const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTheatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }
        res.status(200).json({
            message: "Theatre updated successfully",
            theatre: updatedTheatre,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating theatre", error: error.message });
    }
};



// ✅ Delete Theatre (admin only)
exports.deleteTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.id);

        if (!theatre) {
            return res.status(404).json({ message: "Theatre not found" });
        }

        // Check if the requesting user is the admin who created this theatre
        // Assume req.user.id contains the logged-in user's ID
        if (req.user.id !== theatre.createdBy) {
            return res.status(403).json({ message: "You are not authorized to delete this theatre" });
        }

        await Theatre.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Theatre deleted successfully" });
    } catch (error) {
        console.error("Error deleting theatre:", error);
        res.status(500).json({ message: "Error deleting theatre", error: error.message });
    }
};
