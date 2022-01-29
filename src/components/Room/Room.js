import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import {AttachMoney,LocalHotel,Wc as WcIcon} from '@mui/icons-material/';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';

import { red } from '@mui/material/colors';



export default function Room({room}){
  const navigate =useNavigate()
    const handleBook = (bedType) => {
      navigate(`/book/${bedType}`);
    }
  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />

      <CardMedia
        image={room.imgUrl}
        title="Paella dish"
      />
      <img src={`/images/${room.bedType}.png`} alt=""/>
      <CardContent>
        <Typography  variant="body2" color="textSecondary" component="p">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LocalHotel />: {room.bed} 
        </IconButton>
        <IconButton aria-label="share">
          <WcIcon />: {room.capacity} 
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoney />: {room.price} 
        </IconButton>
        <Button onClick={() => handleBook(room.bedType)} variant="contained" color="primary">
            Book
        </Button>
      </CardActions>
    </Card>
  );
}
