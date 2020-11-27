const mongoose = require("mongoose");

const accidentCategorySchema = new mongoose.Schema({
  accidentValue: { type: String, required: true },
  accidentText: { type: String, required: true },
});

module.exports = mongoose.model("accidentCategory", accidentCategorySchema);
