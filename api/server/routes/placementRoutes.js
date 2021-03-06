const express = require('express')
const router = express.Router()
const PlacementModel = require('../models/PlacementModel')
const { PERMISSIONS, authUser } = require('../middleware/AuthUser')

// GET
router.get("/", async (req, res) => {
    console.log("Querying Placements Data");
    var query = req.body;
    try {
        const placements = await PlacementModel.find(query);
        res.json(placements);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.get("/:id", async (req, res) => {
    console.log("Querying Placement Data");
    try {
        const placement = await PlacementModel.findById(req.params.id);
        res.json(placement);
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});


// POST
router.post("/", authUser(PERMISSIONS.MED), async (req, res) => {
    console.log("Adding New Placement");
    try {
        // Created
        var newPlace = new PlacementModel(req.body);
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (err) {
        // Error : User Already Exists
        message = err.message
        if (err.code == 11000)
            message = "Placement Already Exists !"
        res.status(400).json({ message: message });
    }
});


// PUT
router.put("/:id", authUser(PERMISSIONS.MED), async (req, res) => {
    console.log("Updating Placement");
    try {
        var result = await PlacementModel.updateOne({ _id: req.params.id }, { $set: req.body });
        const placeUpdated = await PlacementModel.findById(req.params.id);
        res.json(placeUpdated);
    } catch (err) {
        // Not Found
        res.status(404).json({ message: "Invalid Id" });
    }
});
router.put("/", authUser(PERMISSIONS.MED), async (req, res) => {
    console.log("Updating All Placement");
    try {
        var result = await PlacementModel.updateOne(req.body.conditions, { $set: req.body.updates });
        res.json({ message: "All Placements Updated" });
    } catch (err) {
        // Bad Request
        res.status(400).json({ message: err.message });
    }
});


// DELETE
router.delete("/:id", authUser(PERMISSIONS.MED), async (req, res) => {
    console.log("Delete Specific Placement");
    try {
        await PlacementModel.deleteOne({ _id: req.params.id })
        res.json({ message: "Placement Deleted" });
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});

module.exports = router;