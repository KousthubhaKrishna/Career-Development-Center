const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    organisation: { type: String, required: "Required" },
    description: { type: String },
    venue: { type: String, required: "Required" },
    date: { type: Date, required: "Required" }
    // Circular Upload
});
module.exports = mongoose.model("events", EventSchema);