const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GradSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    percentages: {
        type: Number,
        required: true
    }
});

module.exports = Grad = mongoose.model("grad", GradSchema);