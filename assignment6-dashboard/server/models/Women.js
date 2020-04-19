const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WomenSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    silicon: {
        type: String,
        required: true
    },
    san: {
        type: String,
        required: true
    },
    cal: {
        type: String,
        required: true
    }
});

module.exports = Women = mongoose.model("women", WomenSchema);