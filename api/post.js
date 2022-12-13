const express = require('express');

const PostModel = require('../db/post.model');

const router = express.Router();


() => {
    NavigationPreloadManager()    
}



router.get('/', function(request, response) {
    // console.log("get all posts")
    return PostModel.getAllPost()
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })


})
// https://ibb.co/wrtxKw6

router.get('/:postId/', function(request, response) {
    const postId = request.params.postId;
    // console.log("@###")
    return PostModel.findPostById(postId)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })
})

router.get('/userPost/:username/', function(request, response) {
    const username = request.params.username;
    // console.log("@###")
    return PostModel.findPostByUsername(username)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })
})

// 'http://localhost:8000/api/pokemon'
router.post('/', function(request, response) {
    const body = request.body;
    // console.log(body)
    return PostModel.insertPost(body)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err){
            response.status(400)
            response.send(err);
        })

    

})

router.put('/description/', function(request, response) {
    const body = request.body;
    // console.log(body)
    var {id,description} = body;
    // console.log(username,password)
    return PostModel.updateDesciption(id,description)
    .then(function(data) {
        response.send(data);
    })

})

router.put('/delete/', function(request, response) {
    const body = request.body;
    // console.log(body)
    var {id} = body;
    // console.log(username,password)
    return PostModel.deletePost(id)
    .then(function(data) {
        response.send(data);
    })

})



module.exports = router;

// "https://i.ibb.co/jZt1LW4/1-Copy.png"