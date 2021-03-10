const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    lastUpdated: Date,
    dateCreated: Date,
    avatar: String,
    lastLogin: Date
});

module.exports = mongoose.model("users", schema);