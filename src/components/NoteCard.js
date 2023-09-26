import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles'
import { yellow, purple, red, blue } from '@mui/material/colors';

const userStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == 'work') {
        return yellow[700];
      }
      if (note.category == 'money') {
        return purple[700];
      }
      if (note.category == 'todos') {
        return red[700];
      }
      if (note.category == 'reminders') {
        return blue[700];
      }
    }
  }
})

// it has a bug
const sx = {
  avatar: {
    bgcolor: (note) => {
      if (note.category == 'work') {
        return yellow[700];
      } else if (note.category == 'money') {
        return purple[700];
      }else if (note.category == 'todos') {
        return red[700];
      }else if (note.category == 'reminders') {
        return blue[700];
      }else {
        return purple[700];
      }
    }
  }
}

export default function NoteCard({note, handleDelete}) {
  const classes = userStyles(note)
  console.log(note.category)
  return (
    <div>
      <Card elevation={3}>
        <CardHeader 
        avatar={
          <Avatar sx={sx.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined/>
            </IconButton>
        }
        title={note.title}
        subheader={note.category}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}


