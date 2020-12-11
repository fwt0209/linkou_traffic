const mongoose = require("mongoose");

const collectionName = "Traffics";
const TrafficSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String, required: true },
  trafficCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "accidentCategory",
  },
  body: { type: String, required: true },
  finished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(collectionName, TrafficSchema, collectionName);
