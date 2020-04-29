const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechGrowthSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    jobs: {
        type: Number,
        required: true
    }
});

module.exports = TechGrowth = mongoose.model("techGrowth", TechGrowthSchema);