// utils/uploadHelper.js
const Upload = require("../models/upload.model");

async function saveBase64Image({ fileName, base64Data, modelId, modelType }) {
  if (!base64Data || !modelId || !modelType)
    throw new Error("Missing required fields");

  const fileType = base64Data.substring(
    "data:".length,
    base64Data.indexOf(";base64")
  );

  const upload = new Upload({
    fileName,
    fileType,
    fileData: base64Data,
    modelRef: modelId,
    modelType,
  });

  await upload.save();
  return upload;
}

module.exports = { saveBase64Image };
