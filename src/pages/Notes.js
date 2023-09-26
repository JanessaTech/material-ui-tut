import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from "axios"
import {
  Link
} from 'react-router-dom'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import NoteCard from '../components/NoteCard'


export default function Notes() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    let options = {
      url : `http://localhost:8000/notes`,
      method: 'get'
    }
    axios(options)
            .then((response) => {
                console.log(response.data)
                setNotes(response.data)
            })
            .catch((error) => {
                console.log('error in axios of fethcing notes')
                console.log(error.response.data)
            })
  }, [])

  const handleDelete = (id) => {
    let options = {
      url : `http://localhost:8000/notes/${id}`,
      method: 'delete'
    }
    axios(options)
            .then((response) => {
                console.log('delete note successfully')
                const newNotes = notes.filter(note => note.id != id) 
                setNotes(newNotes)
            })
            .catch((error) => {
                console.log(`error in axios of deleting notes ${id}`)
                console.log(error.response.data)
            })
            
  }
  return (
    <Container>
      <Grid container spacing={3}>
        {
          notes.map(note => (
            <Grid item xs={12} sm={6} md={3} lg={4} key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete}/>
            </Grid>
          ))
        }
      </Grid>
        <Link to='/create'>Create more</Link>
    </Container>
    
  )
}