const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    first_name:
    {
        type: String,
        required: "Required",
        minlength: "2",
        maxlength: "50"
    },
    last_name:
    {
        type: String,
        required: "Required",
        minlength: "1",
        maxlength: "50"
    },
    roll_no:
    {
        type: String,
        required: "Required",
        unique: true,
        minlength: 10,
        maxlength: 12
    },
    email:
    {
        type: String,
        required: "Required",
        unique: true,
    },
    personal_email:
    {
        type: String,
        required: "Required",
        unique: true,
    },
    mobile:
    {
        type: String,
        required: "Required",
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    mobile_secondary:
    {
        type: String,
        required: "Required",
        minlength: 10,
        maxlength: 10
    },
    year:
    {
        type: Number,
        required: "Required",
        max: 4,
        min: 1
    },
    branch: { type: String, required: "Required" },
    section: { type: String, required: "Required" },

    //  Education
    cgpa: { type: String, required: "Required" },
    backlogs: { type: Boolean, required: "Required" },
    high_school_name: { type: String, required: "Required" },
    high_school_percentage: { type: String, required: "Required" },
    emcet_rank: { type: String, required: "Required" },
    mains_rank: { type: String, required: "Required" },
    school_name: { type: String, required: "Required" },
    school_percentage: { type: String, required: "Required" },

    // Personal Deatils
    father_name: { type: String },
    address: { type: String, required: "Required" },
    city: { type: String, required: "Required" },
    state: { type: String, required: "Required" },
    zip_code: { type: String, required: "Required" },
    date: { type: Date }
    // Photo Upload
    // Resume Upload
});

module.exports = mongoose.model("users", UserSchema);