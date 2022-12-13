import React from 'react';
import { useState } from 'react';
import MyAppBar from '../components/MyAppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


export function SignUpPage(props) {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var createUserInput = {
          username: data.get('username'),
          password: data.get('password'),
          description: data.get('description'),
          imageLink: data.get('imageLink')||'https://source.unsplash.com/random',
          date: Date.now()
      };
      
      Axios.post('http://localhost:8000/api/user', createUserInput)
                  .then(function(response) {
                      // getAllPostData();
                      const cookies = new Cookies();
                      cookies.set('username', createUserInput.username, { path: '/' });
                      
                  })
                  .finally(function() {
                    navigate("/homepage");
                  });
                  
    };


    const handleSubmit2 = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var createUserInput = {
          username: data.get('username'),
          password: data.get('password'),
      };
      
      // console.log(createUserInput);
    
      Axios.post('http://localhost:8000/api/user/auth', createUserInput)
                  .then(function(response) {
                      // getAllPostData();
                      const cookies = new Cookies();
                      cookies.set('username', response.data, { path: '/' });
                      
                    })
                  .finally(function() {
                    navigate("/homepage");
                  });
      
    };


    return (
        <div>
        <MyAppBar></MyAppBar>
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        <Grid item xs={6} elevation={6} square sx={{ height: '100vh' }}>
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
              Create New User
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                // autoComplete="froselle"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                // autoComplete="Say something"
              />
              <TextField
                margin="normal"
                // required
                fullWidth
                name="description"
                label="optional personal description"
                // type="password"
                id="description"
                autoComplete="Say something"
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create!
              </Button>
              
            </Box>
          </Box>
        </Grid>

        



        <Grid item xs={6}  elevation={6} square sx={{ height: '100vh' }}>
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
              Log in Current User
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit2} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                // autoComplete="froselle"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                // autoComplete="Say something"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In!
              </Button>
              
              
            </Box>
          </Box>
        </Grid>
        </Grid>
        </div>
    )

}