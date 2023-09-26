import React, {useState} from 'react'
import { Button, FormControlLabel, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import makeStyles from '@mui/styles/makeStyles';
import { styled,  createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
  
})

/*const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: purple,
  }})
*/
const theme = createTheme({
  overrides: {
    MuiRadio: {
      root: {
        color: 'green',
      },
      colorSecondary: {
        '&$checked': {
          color: 'green',
        },
      },
    },
  },
});

export default function Create() {
  const navigate = useNavigate();
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('reminders')


  const handleSubmit = (e) => {
    e.preventDefault(false)
    
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if(details == '') {
      setDetailsError(true)
    }

    if (title && details) {
      console.log(JSON.stringify({title, details, category}))
      let newNote = {
        title: title,
        details: details,
        category: category
      }
      let options = {};
      options = {
          url: 'http://localhost:8000/notes',
          method: 'post',
          data: newNote
      }

      axios(options)
            .then((response) => {
                console.log(response)
                navigate('/')
            })
            .catch((err) => {
                console.log('add new note error')
                console.log(err.response.data)
            })
    }
  }

  const handleCategory = (e) => {
    e.preventDefault(false)
    setCategory(e.target.value)
  }
  return (
    
    <ThemeProvider theme={theme}>
<Container>
      <Typography
        variant='h6'
        color='textSecondary'
        component="h2"
        gutterBottom>
          Create a new note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField 
          InputProps={{
            className: classes.field
          }}
          label='Note title' 
          variant="outlined"
          color='primary'
          fullWidth
          error={titleError}
          onChange={(e) => {setTitle(e.target.value)}}
          required></TextField>
        <TextField 
          InputProps={{
            className: classes.field
          }}
          onChange={(e) => {setDetails(e.target.value)}}
          label='details' 
          variant="outlined"
          multiline
          rows={3}
          color='secondary'
          fullWidth
          error={detailsError}
          required>
        </TextField>

        <FormControl sx={{
          display: 'block',
          marginBottom:1
        }}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup value={category} onChange={handleCategory}>
            <FormControlLabel value='money' control={<Radio/>} label='Money'/>
            <FormControlLabel value='todos' control={<Radio/>} label='todos'/>
            <FormControlLabel value='reminders' control={<Radio/>} label='reminders'/>
            <FormControlLabel value='work' control={<Radio/>} label='work'/>
          </RadioGroup>
        </FormControl>
        <Button
          startIcon={<AirplanemodeActiveIcon/>}
          type='submit'
          color='secondary'
          variant='contained'>Submit
        </Button>
      </form>  
    </Container>
    </ThemeProvider>
    
  )
}
