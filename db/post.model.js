const mongoose = require('mongoose');

const PostSchema = require('./post.schema').PostSchema
const UserSchema = require('./user.schema').UserSchema

const PostModel = mongoose.model("Post", PostSchema);
const UserModel = mongoose.model("User", UserSchema);

function insertPost(post) {
    // post.imageLink = UserModel.find({username:post.username}).exec();
    return UserModel.find({username:post.username}).exec().then(
        function(res) {
            post.userImageLink = res[0].imageLink
            console.log(res[0].imageLink)
            console.log(post)
            
        }
    ).finally(
        ()=> {PostModel.create(post);}
    )
    
    console.log("happy")
}

function getAllPost() {
    return PostModel.find().exec();
}

function findPostById(id) {
    return PostModel.findById(id).exec();
}

function findPostByUsername(username) {
    return PostModel.find({username:username}).exec()
}

function updateDesciption(id,description){
    console.log(id,description)
    const filter = { "_id": id };
    const update = { "description": description };

    // `doc` is the document _after_ `update` was applied because of
    // `returnOriginal: false`
    return doc = PostModel.findOneAndUpdate(filter, update)
}

function deletePost(id){
    // console.log(id,description)
    const filter = { "_id": id };
    // const update = { "description": description };

    // `doc` is the document _after_ `update` was applied because of
    // `returnOriginal: false`
    return doc = PostModel.deleteOne(filter)
}

module.exports = {
    insertPost,
    getAllPost,
    findPostById,
    findPostByUsername,
    updateDesciption,
    deletePost,
}