// Required Imports
require('dotenv').config();
require("./models/Conn");
const AuthModel = require('./models/AuthModel');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Initialise application 
const application = express();
application.use(express.urlencoded({
    extended: true
}));
application.use(cors());
application.use(express.json());
application.use((err, req, res, next) => {
    if (err instanceof SyntaxError) return res.status(400).send(JSON.stringify({
        error: "Invalid JSON"
    }))
    console.error(err);
    res.status(500).send();
});

// Routes
application.get('/api', (req, res) => {
    res.send("<h1> CDC API </h1>");
});


// Import Routes
const usersRoutes = require('./routes/usersRoutes');
application.use("/api/users", usersRoutes)

const placementRoutes = require('./routes/placementRoutes');
application.use("/api/placements", placementRoutes);

const eventRoutes = require('./routes/eventRoutes');
application.use("/api/events", eventRoutes);

//Currently only for admin Login
application.get('/api/login', async (req, res) => {
    const credentials = req.body;
    try {
        const account = await AuthModel.findOne({ "email": credentials.email });
        if (account != null && account.password == credentials.password) {
            const accessToken = jwt.sign(account.toJSON(), process.env.ACCESS_TOKEN_SECRET);
            res.send({ accessToken: accessToken });
        } else {
            res.status(401).json({ message: "Invalid User Id or Password" });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
});

/* Registeration No endpoint should be created
application.post('/api/login/', async (req, res) => {
    try {
        // User Created
        var newUserLogin = new AuthModel(req.body);
        const savedLogin = await newUserLogin.save();
        res.status(201).json(savedLogin);
    } catch (err) {
        // Error : User Already Exists
        message = err.message
        if (err.code == 11000)
            message = "Email Already Taken !"
        res.status(400).json({ message: message });
    }
})*/

// Starting Server to listen 
const port = process.env.PORT || 3080;
application.listen(port, () => {
    console.log('Server started at port: ' + port);
});