const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    postedOn: {
        type: Number,
        required: true,
    },
});

module.exports = Users = mongoose.model("postings", PostSchema);