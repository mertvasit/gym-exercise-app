const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    muscles: { type: String, required: true },
    explanation: { type: String },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
