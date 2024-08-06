const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        require: true,
    },
    ref: {
        type: String,
        required:true
    }
})


const Message = new mongoose.model("message", schema);
module.exports = Message;