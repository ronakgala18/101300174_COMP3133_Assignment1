const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Email is in wrong format"],
        required: [true, "Email is required"]
    },
    password: { 
        type: String,
        required: [true, "Password is required"]
    }
});



module.exports = mongoose.model("User", userSchema);