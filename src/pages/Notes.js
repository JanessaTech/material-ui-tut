import React, {useState} from 'react'
import { useEffect } from 'react'
import axios from "axios"
import {
  Link
} from 'react-router-dom'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css';


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
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }
  return (
    <Container>
      <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      >
        {
          notes.map(note => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete}/>
            </div>
          ))
        }
     </Masonry>
        <Link to='/create'>Create more</Link>
    </Container>
    
  )
}