const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobGrowthSchema = new Schema({
    quarter: {
        type: String,
        required: true
    },
    jobs: {
        type: Number,
        required: true
    }
});

module.exports = JobGrowth = mongoose.model("jobgrowth", JobGrowthSchema);