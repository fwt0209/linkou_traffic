const mongoose = require("mongoose");

const TrafficSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "accidentCategory" },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Traffics", TrafficSchema);
