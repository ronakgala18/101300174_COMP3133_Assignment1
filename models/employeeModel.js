const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"]
    }
});

module.exports = mongoose.model("Employee", employeeSchema);