const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    title: String,
    description: String,
    author: String,
    lastUpdated: Date,
    dateCreated: Date,
    featuredImage: String
});

module.exports = mongoose.model("advert", schema);