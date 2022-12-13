const express = require('express');
const PostRoute = require('./api/post');
const UserRoute = require('./api/user');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/post', PostRoute);
app.use('/api/user', UserRoute);


app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

MongoAtlasURLString = "mongodb+srv://froselle:z9084725@cluster0.6xetkn2.mongodb.net/twitt?retryWrites=true&w=majority"

// const mongoEndpoint = 'mongodb://127.0.0.1/pokemons';
// const mongoEndpoint = 'mongodb://127.0.0.1/twitt';
const mongoEndpoint = MongoAtlasURLString;
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));




app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server...?')
})