const express = require('express')
const router = express.Router()
const EventModel = require('../models/EventModel')

// GET
router.get("/", async (req, res) => {
    console.log("Querying Events Data");
    var query = req.body;
    try {
        const events = await EventModel.find(query);
        res.json(events);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.get("/:id", async (req, res) => {
    console.log("Querying Specific Event Data");
    try {
        const event = await EventModel.findById(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});


// POST
router.post("/", async (req, res) => {
    console.log("Adding New Event");
    try {
        // Created
        var newEvent = new EventModel(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {

        // Error : Event Already Exists
        message = err.message
        if (err.code == 11000)
            message = "Event Already Exists !"
        res.status(400).json({ message: message });
    }
});


// PUT
router.put("/:id", async (req, res) => {
    console.log("Updating Event");
    try {
        var result = await EventModel.updateOne({ _id: req.params.id }, { $set: req.body });
        const eventUpdated = await EventModel.findById(req.params.id);
        res.json(eventUpdated);
    } catch (err) {
        // Not Found
        res.status(404).json({ message: "Invalid Id" });
    }
});
router.put("/", async (req, res) => {
    console.log("Updating All Events");
    try {
        var result = await EventModel.updateOne(req.body.conditions, { $set: req.body.updates });
        res.json({ message: "All Events Updated" });
    } catch (err) {
        // Bad Request
        res.status(400).json({ message: err.message });
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    console.log("Delete Specific Event");
    try {
        await EventModel.deleteOne({ _id: req.params.id })
        res.json({ message: "Event Deleted" });
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});

module.exports = router;