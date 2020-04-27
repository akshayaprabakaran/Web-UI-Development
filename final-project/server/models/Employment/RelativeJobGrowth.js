const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RelativeJobGrowthSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    percentages: {
        type: Number,
        required: true
    }
});

module.exports = RelativeJobGrowth = mongoose.model("relativeJobGrowth", RelativeJobGrowthSchema);