const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: { type: String },
});

const ParentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  child: { type: ChildSchema },
  grandChildren: [{ type: ChildSchema }],
  test: { age: String, col: String },
});

module.exports = mongoose.model("Parents", ParentSchema);
