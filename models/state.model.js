const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    stateKey: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("State", stateSchema);
