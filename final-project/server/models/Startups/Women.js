const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WomenSchema = new Schema({
    years: {
        type: String,
        required: true
    },
    SV: {
        type: Number,
        required: true
    },
    SF: {
        type: Number,
        required: true
    },
    CA: {
        type: Number,
        required: true
    },
    
});

module.exports = Early = mongoose.model("women", WomenSchema);