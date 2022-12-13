const Schema = require('mongoose').Schema

exports.PostSchema = new Schema({
    username: String,
    date: Date,
    description: String,
    imageLink: String,
    userImageLink: String
}, {collection: 'post'})

