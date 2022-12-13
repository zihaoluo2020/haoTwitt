import React from 'react';
import { useState } from 'react';
import MyAppBar from '../components/MyAppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useEffect } from 'react';
import  Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";




export function CreatePostPage(props) {

    const [logUser, setLogUser] = useState("");
    const navigate = useNavigate();

    useEffect(function() {
      const cookies = new Cookies();
      setLogUser(cookies.get('username'))
      if(!cookies.get('username')){
        navigate("/signup");
      }
  
    }, [logUser]);

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var postInput = {
          username: logUser,
          description: data.get('description'),
          imageLink: data.get('imageLink')||'https://source.unsplash.com/random',
          date: Date.now()
      };
      
      Axios.post('/api/post', postInput)
                  .then(function(response) {
                      // getAllPostData();
                      navigate("/homepage");
                  })
                  .finally(function() {
      
                  });
                  
      };

    return (
        <div>
        <MyAppBar></MyAppBar>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        

        <Grid item xs={12} component={Paper} elevation={6} square sx={{ height: '70vh' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Create New Post
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="say something today"
                // type="password"
                id="description"
                // autoComplete="Say something"
              />
              <TextField
                margin="normal"
                // required
                fullWidth
                name="imageLink"
                label="optional image link"
                // type="password"
                id="imageLink"
                autoComplete="Say something"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                POST!
              </Button>
              
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '30vh'
          }}
        />
        </Grid>
        </div>
    )

}