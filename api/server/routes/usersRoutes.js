const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const checkAuthToken = require('../middleware/checkAuthToken');


// GET
// Should also authenticate if he/she is PC
router.get("/", checkAuthToken, async (req, res) => {
    console.log("Querying Users Data");
    var query = req.body;
    try {
        const users = await UserModel.find(query);
        res.json(users);
    } catch (err) {
        res.json({ message: err.message });
    }
});
router.get("/:id", checkAuthToken, async (req, res) => {
    console.log("Querying Specific User Data");
    try {
        const user = await UserModel.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});


// POST
router.post("/", checkAuthToken, async (req, res) => {
    console.log("Adding New User");
    try {
        // Created
        var newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        // Error : User Already Exists
        message = err.message
        if (err.code == 11000) {
            message = "User Already Exists !";
            res.status(400).send(message);
        }
        res.json({ message: message });
    }
});


// PUT
router.put("/:id", checkAuthToken, async (req, res) => {
    console.log("Updating User");
    try {
        var result = await UserModel.updateOne({ _id: req.params.id }, { $set: req.body });
        const userUpdated = await UserModel.findById(req.params.id);
        res.json(userUpdated);
    } catch (err) {
        // Not Found
        res.status(404).json({ message: "Invalid Id" });
    }
});
router.put("/", checkAuthToken, async (req, res) => {
    console.log("Updating All Users");
    try {
        var result = await UserModel.updateOne(req.body.conditions, { $set: req.body.updates });
        res.json({ message: "All Users Updated" });
    } catch (err) {
        // Bad Request
        res.status(400).json({ message: err.message });
    }
});


// DELETE
router.delete("/:id", checkAuthToken, async (req, res) => {
    console.log("Delete Specific User");
    try {
        await UserModel.deleteOne({ _id: req.params.id })
        res.json({ message: "User Deleted" });
    } catch (err) {
        res.status(404).json({ message: "Id not found." });
    }
});

module.exports = router;