const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://cbit:cbit1234@cbit.nmmtx.mongodb.net/cdc?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connection established to database..");
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => { console.log("Connected TO DB"); });
// module.exports = db;