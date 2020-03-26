const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
    required: true
  },
  firstName:{
    type:String
  },
  lastName: {
    type:String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  }
});

module.exports = Users = mongoose.model("users", UserSchema);