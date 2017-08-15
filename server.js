const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./router');
const cors = require("cors");

// Connects server to MongoDB and Mongoose
mongoose.Promise = global.Promise;

// Creates an Express server listening on port 3000
const port = process.env.PORT || 3000;
const uri = ('mongodb://annafkh:dailytuba@ds123752.mlab.com:23752/tiles')
mongoose.connect(uri, { useMongoClient: true });

// mongoose.connect("mongodb://localhost:27017/timetiles");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
app.listen(port);

// Parses incoming requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

console.log("Tracker API server listening on port:", port);
