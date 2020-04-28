const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
    years: {
        type: Number,
        required: true
    },
    Silnumbers: {
        type: Number,
        required: true
    },
    Uspercent: {
        type: Number,
        required: true
    }
});

module.exports = Degree = mongoose.model("degree", DegreeSchema);