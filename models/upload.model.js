const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileData: String, 
  modelRef: { type: mongoose.Schema.Types.ObjectId, required: true },
  modelType: { type: String, enum: ["Movie", "Theatre", "User"], required: true },
});

module.exports = mongoose.model("Upload", uploadSchema);
