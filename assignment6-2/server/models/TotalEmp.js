const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TotalEmpSchema = new Schema({
    sector: {
        type: String,
        required: true
    },
    percentage: {
        type: String,
        required: true
    }
});

module.exports = TotalEmp = mongoose.model("totalemp", TotalEmpSchema);