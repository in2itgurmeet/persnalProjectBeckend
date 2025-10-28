// routes/upload.routes.js
const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");

/**
 * @swagger
 * /uploads/upload:
 *   post:
 *     summary: Upload an image file and link it to a model (Movie, Theatre, or User)
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - modelId
 *               - modelType
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *               modelId:
 *                 type: string
 *                 example: 671c7c02f00246a8bcb9d412
 *                 description: ID of the model this image belongs to
 *               modelType:
 *                 type: string
 *                 enum: [Movie, Theatre, User]
 *                 description: Model type (collection name)
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input or missing file
 *       500:
 *         description: Internal server error
 */
router.post(
  "/upload",
  uploadController.uploadMiddleware, // ✅ Multer middleware
  uploadController.uploadImage
);

/**
 * @swagger
 * /uploads/model/{modelId}:
 *   get:
 *     summary: Get all uploaded images for a specific model
 *     tags: [Uploads]
 *     parameters:
 *       - in: path
 *         name: modelId
 *         required: true
 *         description: The model ID (Movie/Theatre/User)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of uploaded images
 *       404:
 *         description: No images found for this model
 */
router.get("/model/:modelId", uploadController.getImagesByModel);

module.exports = router;
