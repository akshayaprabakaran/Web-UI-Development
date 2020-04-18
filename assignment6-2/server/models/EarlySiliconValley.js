var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EarlySiliconValleySchema = new Schema({
    years: {
        type: String
    },
    numbers: {
        type: Number
    }
});

module.exports = JobGrowth = mongoose.model("earlyCA", EarlySiliconValleySchema);