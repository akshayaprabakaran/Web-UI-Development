const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    level: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});

module.exports = Level = mongoose.model("level", LevelSchema);