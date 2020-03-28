const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    postedOn: {
        type: String,
        required: false
    },
});

module.exports = Users = mongoose.model("postings", PostSchema);