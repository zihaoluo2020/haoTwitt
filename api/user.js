const express = require('express');
const jwt = require('jsonwebtoken');

const UserModel = require('../db/user.model');

const router = express.Router();



() => {
    NavigationPreloadManager()    
}



// router.get('/', function(request, response) {
//     // console.log("get all posts")
//     return PostModel.getAllPost()
//         .then(function(data) {
//             response.send(data);
//         })
//         .catch(function(err) {
//             response.status(400);
//             response.send(err);
//         })


// })
// https://ibb.co/wrtxKw6

router.get('/isAuth/', function(request, response) {
    const cookies = request.cookies;
    const token = cookies.jwt_token;
    console.log(cookies)
    return response.status(200).send({"data":cookies["username"]})

    // if(!token){
    //     return response.status(401);
    // }
    // console.log(cookies, token)
    

})

router.get('/:username/', function(request, response) {
    const username = request.params.username;
    // console.log("@###")
    return UserModel.findUserByUsername(username)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err) {
            response.status(400);
            response.send(err);
        })
})

// router.get('/userPost/:username/', function(request, response) {
//     const username = request.params.username;
//     // console.log("@###")
//     return PostModel.findPostByUsername(username)
//         .then(function(data) {
//             response.send(data);
//         })
//         .catch(function(err) {
//             response.status(400);
//             response.send(err);
//         })
// })

// 'http://localhost:8000/api/pokemon'
router.post('/', function(request, response) {
    const body = request.body;
    // console.log(body)
    return UserModel.insertUser(body)
        .then(function(data) {
            response.send(data);
        })
        .catch(function(err){
            response.status(400)
            response.send(err);
        })

    

})

router.post('/auth/', function(request, response) {
    const body = request.body;
    var {username,password} = body;
    // console.log(username,password)
    UserModel.findUserByUsername(username)
        .then((user) =>{
            
            // console.log(user[0].password, password)
            if (user && user[0].password === password){
                // response.cookie('userImageLink', user[0].imageLink,
                // )
                return response.cookie('jwt_token', username,
                {httpOnly: false, secure:false}).status(200).send(user[0].username)
                
            }else{
                return response.status(400).send("Password Invalid")
            }
            
            
        })
    
    

})

router.put('/description/', function(request, response) {
    const body = request.body;
    var {username,description} = body;
    // console.log(username,password)
    return UserModel.updateDesciption(username,description)
    .then(function(data) {
        response.send(data);
    })

})


module.exports = router;