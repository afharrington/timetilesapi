var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Entry = new Schema({
  content: { type: String, required: true },
  minutes: { type: Number },
  created_date: { type: Date, default: Date.now }
});

var Tile = new Schema({
  created_date: { type: Date, default: Date.now },
  name: { type: String, require: true },
  user: { type: String },
  totalMinutes: { type: Number, default: 0 },
  color: { type: Number, default: 0 },
  entries: [Entry]
});

module.exports = mongoose.model("Tile", Tile);
