import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {CssBaseline,Stack} from '@mui/material';
import FeaturedPost from '../components/FeaturedPost'
import { Container } from '@mui/system';
import MyAppBar from '../components/MyAppBar';
import MainFeaturedPost from '../components/MainFeaturedPost';

export default function PersonPage() {


    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    function getAllUserData() {
        const username = params.username;
        Axios.get('/api/user/' + username)
        .then(function(response) {
            
            setUser(response.data[0]);
        })

    }
    function getAllPostData() {
        const username = params.username;
        Axios.get('/api/post/userPost/' + username)
        .then(function(response) {
            

            response.data.sort(function(a, b) {
                var keyA = new Date(a.date),
                  keyB = new Date(b.date);
                // Compare the 2 dates
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
              });
            
            setPosts(response.data);
        })

    }

    useEffect(function() {
        getAllUserData()
        getAllPostData()
        
    }, []);

    const post_components = [];
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        const post_component = (<FeaturedPost key = {post.description} post={post}></FeaturedPost>)
        post_components.push(post_component);
    }

    return (<div>
        <MyAppBar></MyAppBar>
        <Container  maxWidth="lg" sx={{"background-color":"#0089ff1f", "minHeight":"100vh"}}>
        
            <CssBaseline />
            <Stack spacing={1}>
            <MainFeaturedPost user = {user}></MainFeaturedPost>
            
            {post_components}
            </Stack>
        </Container>
    </div>)
}