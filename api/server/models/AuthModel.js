const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    email: { type: String, required: "Required" },
    password: { type: String, required: "Required" },
    role: { type: String, enum: ["student", "coordinator", "admin"], default: "student" }
});

module.exports = mongoose.model("auths", AuthSchema);