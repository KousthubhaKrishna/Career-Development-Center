const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    email: { type: String, required: "Required" },
    password: { type: String, required: "Required" },
    role: { type: String, default: "Student" }
});

module.exports = mongoose.model("auths", AuthSchema);