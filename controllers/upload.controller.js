const multer = require("multer");
const Upload = require("../models/upload.model");

// Multer setup (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });
exports.uploadMiddleware = upload.single("file");



exports.uploadImage = async (req, res) => {
  try {
    const { modelId, modelType } = req.body;

    if (!req.file && !req.body.fileData) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newUpload = new Upload({
      fileName: req.file?.originalname || "uploaded_file",
      fileType: req.file?.mimetype || "image/jpeg",
      fileData: req.body.fileData || req.file.buffer.toString("base64"),
      modelRef: modelId,
      modelType,
    });

    const savedUpload = await newUpload.save();

    // 🔗 Auto-link to user or movie
    if (modelType === "User") {
      await User.findByIdAndUpdate(modelId, { profileImg: savedUpload._id });
    } else if (modelType === "Movie") {
      await Movie.findByIdAndUpdate(modelId, { posterRef: savedUpload._id });
    }

    res.status(201).json({
      success: true,
      message: "Image uploaded and linked successfully",
      upload: savedUpload,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getImagesByModel = async (req, res) => {
  try {
    const images = await Upload.find({ modelRef: req.params.modelId });
    if (!images.length) return res.status(404).json({ message: "No images found" });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
