import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import TextField from '@mui/material/TextField';
import Cookies from 'universal-cookie';
import EditIcon from '@mui/icons-material/Edit';
import Axios from 'axios';


function MainFeaturedPost(props) {
  const { user } = props;
  const logUser = new Cookies().get('username')
  const [modify, setModify] = React.useState(false);
  const [text, setText] = React.useState(user.description);


  const handleStart = ()=>{
      setModify(true);
  }

  const handleEnd = ()=>{
    // console.log(text)
    setModify(false);
    Axios.put('http://localhost:8000/api/user/description', 
    {"username":logUser, "description":text})
            .then(function(response) {
              window.location.reload(false);
            })
            .finally(function() {
               
            });
  }

  function onTextInput(e) {
    const text = e.target.value;
    setText(
      text
    )
  }



  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${user.imageLink})`,
        width: '85%',
        left: '6%',
        margin: '10px',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={user.imageLink} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 3 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {user.username} 
            </Typography>
            <Typography variant="h5" color="inherit" paragraph >
              {user.description} 
              

              {
                logUser === user.username ?
                <>
              {
                // if(logUser === user.username){
                !modify?
                (<EditIcon onClick = {handleStart}>
                </EditIcon>)
                :
                (<div>
                <TextField id="outlined-basic" label="Outlined" 
                variant="filled"  color="warning"
                value={text} onInput={onTextInput}
                sx={{ input: { color: 'white' } }}/>
                <DoneOutlineIcon 
                onClick = {handleEnd}> Submit </DoneOutlineIcon>
                </div>)
                
              }
                </>:
                <p/>
              
              }
              
              

            </Typography>
            <Typography variant="subtitle1" color="inherit" paragraph>
              Join: {new Date(user.date).toLocaleString()}
            </Typography>
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
};

export default MainFeaturedPost;
