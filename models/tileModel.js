var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Entry = new Schema({
  content: { type: String, required: true },
  comments: { type: String, default: '' },
  minutes: { type: Number },
  date: { type: Date }
});

var Tile = new Schema({
  created_date: { type: Date, default: Date.now },
  name: { type: String, require: true },
  user: { type: String },
  totalMinutes: { type: Number, default: 0 },
  color: { type: Number, default: 0 },
  entries: [Entry],
  mode: { type: String, required: true, default: "continuous" },
  continuousHours: { type: Number, default: 1 },
  continuousDays: { type: Number, default: 2 },
  goalHours: { type: Number, default: null },
  goalCycle: { type: String, default: null },
  goalLastCycleStart: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tile", Tile);
