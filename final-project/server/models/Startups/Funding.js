const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FundingSchema = new Schema({
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
    
});

module.exports = Funding = mongoose.model("funding", FundingSchema);