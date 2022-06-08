const mongoose = require("mongoose");

const blogData = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add title"]
        },
        body: {
            type: String,
            required: [true, "Please add body"]
        },
        founder: {
            type: String,
            required: [true, "Please add founder"]
        }
    }
);

module.exports = mongoose.model("blogData", blogData);