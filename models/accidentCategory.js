const mongoose = require("mongoose");

const collectionName = "accidentCategory";
const accidentCategorySchema = new mongoose.Schema({
  accidentValue: { type: String, required: true },
  accidentText: { type: String, required: true },
  selected: { type: Boolean },
});

module.exports = mongoose.model(
  collectionName,
  accidentCategorySchema,
  collectionName
);
