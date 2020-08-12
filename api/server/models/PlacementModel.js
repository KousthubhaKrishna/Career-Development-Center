const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
    company: { type: String, required: "Required" },

    // Full time or Intern
    job_type: { type: String, required: "Required" },

    job_description: { type: String, required: "Required" },

    // Salary or Stipend
    salary: { type: Number },

    placement_drive_details: { type: String },

    eligibility: {
        cgpa: { type: String, required: "Required" },
        backlogs: { type: Boolean, required: "Required" },
        branch: { type: [String], required: "Required" }
    },

    date: { type: Date }
});
module.exports = mongoose.model("placements", PlacementSchema);