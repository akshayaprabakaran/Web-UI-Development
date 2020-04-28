const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    level: {
        type: String,
        required: true
    },
    Less: {
        type: Number,
        required: true
    },
    High: {
        type: Number,
        required: true
    },
    Some: {
        type: Number,
        required: true
    },
    Bach: {
        type: Number,
        required: true
    },
    Grad: {
        type: Number,
        required: true
    }
});

module.exports = Level = mongoose.model("level", LevelSchema);