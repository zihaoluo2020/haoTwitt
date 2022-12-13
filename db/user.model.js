const mongoose = require('mongoose');

const UserSchema = require('./user.schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

// function getAllPost() {
//     return PostModel.find().exec();
// }

function findUserById(id) {
    return UserModel.findById(id).exec();
}

function findUserByUsername(username) {
    return UserModel.find({username:username}).exec()
}

function updateDesciption(username,description){
    const filter = { "username": username };
    const update = { "description": description };

    // `doc` is the document _after_ `update` was applied because of
    // `returnOriginal: false`
    return doc = UserModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
    });
}

module.exports = {
    insertUser,
    findUserById,
    findUserByUsername,
    updateDesciption,
}