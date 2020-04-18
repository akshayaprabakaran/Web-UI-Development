var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EarlySFSchema = new Schema({
    years: {
        type: String
    },
    numbers: {
        type: Number
    }
});

module.exports = JobGrowth = mongoose.model("earlySF", EarlySFSchema);