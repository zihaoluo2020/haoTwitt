const Schema = require('mongoose').Schema

exports.UserSchema = new Schema({
    username: String,
    date: Date,
    description: String,
    imageLink: String,
    password: String,
}, {collection: 'user'})

