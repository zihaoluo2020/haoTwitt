import * as React from 'react';
import {PropTypes} from 'prop-types';
import {Typography} from '@mui/material';
import {Unstable_Grid2} from '@mui/material/';
import {Card} from '@mui/material';
import {CardActionArea} from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia,Avatar,ListItemButton,ListItemIcon,ListItemText} from '@mui/material';

import { TextField } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function FeaturedPost(props) {
  const { post } = props;
  const logUser = new Cookies().get('username')
  const [modify, setModify] = React.useState(false);
  const [text, setText] = React.useState(post.description);
  const navigate = useNavigate();

  const handleStart = ()=>{
      setModify(true);
  }

  const handleEnd = ()=>{
    // console.log(text)
    setModify(false);
    // console.log(post._id)
    Axios.put('/api/post/description', 
    {"id":post._id, "description":text})
            .then(function(response) {
                navigate("/homepage");
            })
            .finally(function() {
              window.location.reload(false);
            });
  }

  const handleDelete = ()=>{
    // console.log(text)
    setModify(false);
    Axios.put('/api/post/delete', 
    {"id":post._id})
            .then(function(response) {
                navigate("/homepage");
            })
            .finally(function() {
              window.location.reload(false);
            });
  }

  function onTextInput(e) {
    const text = e.target.value;
    setText(
      text
    )
  }


  return (
    <div >
    <Unstable_Grid2 container >
    <Unstable_Grid2 xs={1}>
      {/* <Avatar src = {post.image} sx={{ width: 200, height: 200 }}> </Avatar> */}
    </Unstable_Grid2>
    <Unstable_Grid2 xs={10} display="flex" justifyContent="center" alignItems="center">

        <Card sx={{ width: 1}}>
          

            <ListItemButton component="a" href={"/user/" + post.username}>
              <ListItemIcon sx={{ fontSize: 20 }}><Avatar src = {post.userImageLink} > </Avatar></ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary={post.username}
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>


          
          <CardContent>
            
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(post.date).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            
            
          </CardContent>
          
          <CardMedia  
            // height="500"
            // width="209"
            component="img"
            // object-fit = "true"
            // sx={{ display: 'block'}}
            sx={{ width: 1, px: 12, py:2 }} 
            
            image={post.imageLink}
            // alt={post.imageLabel}
          />
          
          <CardContent>
          {
                logUser === post.username ?
                <>
                <>
              {
                
                !modify?
                (<CardActionArea onClick = {handleStart}>
                <EditIcon >
                </EditIcon></CardActionArea>
                )
                :
                (<div>
                <TextField id="outlined-basic" label="Edit" 
                variant="filled"  color="warning"
                value={text} onInput={onTextInput} fullWidth 
                sx={{ input: { color: 'white' } }}/>
                <CardActionArea onClick = {handleEnd}>
                <DoneOutlineIcon 
                > Submit </DoneOutlineIcon>
                </CardActionArea>
                </div>)
                
              }
                </>
                <CardActionArea onClick = {handleDelete}>
                <DeleteIcon ></DeleteIcon> 
                </CardActionArea>
                </>:
                <p/>
              
              }
            
            
          </CardContent>

        </Card>

    </Unstable_Grid2>
    </Unstable_Grid2>
    </div>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
