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
    password: {
        type: String,
        // require: true,
    },
    age: {
        type: Number,
        // required: true
    },
    gender: {
        type: String,
        // require: true,
        enum: ["male", "female", "other"]
    }
    
})

schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10)
        // this.confirmpassword = await bcryptjs.hash(this.confirmpassword ,10)
    }
    next()
})


const User = new mongoose.model("user", schema);
module.exports = User;