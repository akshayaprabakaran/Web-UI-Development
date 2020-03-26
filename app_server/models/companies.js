const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    unique: true
    required: true
  },
  title: {
    type: String,
    unique: true
    required: true,
  },
  description: {
    type: String
  },
  location: { 
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Companies = mongoose.model("users", CompanySchema);