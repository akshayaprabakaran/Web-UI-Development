const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TotalJobGrowthSchema = new Schema({
    quarter: {
        type: String,
        required: true
    },
    jobs: {
        type: Number,
        required: true
    }
});

module.exports = TotalJobGrowth = mongoose.model("totalJobGrowth", TotalJobGrowthSchema);