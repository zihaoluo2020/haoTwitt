import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {CssBaseline,Stack} from '@mui/material';
import FeaturedPost from '../components/FeaturedPost'
import { Container } from '@mui/system';
import MyAppBar from '../components/MyAppBar';

export default function HomePage() {

    const [posts, setPosts] = useState([]);
    

    function getAllPostData() {
        Axios.get('/api/post')
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
        getAllPostData();
    }, []);

    const post_components = [];
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        const post_component = (<FeaturedPost key = {post.description} post={post}></FeaturedPost>)
        post_components.push(post_component);
    }

    return (<div>
        <MyAppBar></MyAppBar>
        <Container  maxWidth="lg" sx={{"background-color":"#0089ff1f", "height":"auto"}}>
        
            <CssBaseline />
            <Stack spacing={1}>
            {post_components}
            </Stack>
        </Container>
    </div>)
}