const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TotalEmpSchema = new Schema({
    sector: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});

module.exports = TotalEmp = mongoose.model("totalemp", TotalEmpSchema);