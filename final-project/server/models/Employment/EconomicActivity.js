const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EconomicActivitySchema = new Schema({
    activity: {
        type: String,
        required: true
    },
    percentages: {
        type: Number,
        required: true
    }
});

module.exports = EconomicActivity = mongoose.model("economicActivity", EconomicActivitySchema);