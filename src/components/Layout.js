import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material';
import format from 'date-fns/format';
import Avatar from '@mui/material/Avatar';


const  drawerWidth = 240

const sx = {
    content: {
        backgroundColor:'#f3f2f2',
        width:'100%'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: (theme) => theme.mixins.toolbar,
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: (theme) => theme.spacing(2)
    }
}

export default function Layout({children}) { 
 // {children} prop is important otherwise we cannot see all content inside Routes defined in app
 /*
 const theme = useTheme();
 Then replace the code below with <Box sx={sx.toolbar}></Box>
 <Box sx={theme.mixins.toolbar}></Box>
 We will have the same result
*/
 const menuItems = [
    {
        text: 'My Notes',
        icon: <SubjectOutlined color='secondary'/>,
        path: '/',
        pos: 0
    },
    {
        text: 'Create Note',
        icon: <AddCircleOutlineOutlined color='secondary'/>,
        path: '/create',
        pos: 1
    }
 ]
 const navigate = useNavigate();
 const [selectedIndex, setSelectedIndex] = useState(0)
 const location = useLocation() // get the current url

 const handleClick = (e, item) => {
    e.preventDefault(false)
    setSelectedIndex(item.pos)
    navigate(item.path)
 }
 
 return (
    <Box sx={sx.root}>
        <AppBar sx={sx.appbar} elevation={10}>
            <Toolbar>
                <Typography sx={sx.date}>
                    Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>
                <Typography>Janessa</Typography>
                <Avatar src="/prof.png" sx={sx.avatar}/>
            </Toolbar>
        </AppBar>
        <Drawer sx={sx.drawer}
            variant='permanent'
            anchor='left'>
            <Box>
                <Typography variant='h5'>
                        Jane Notes
                </Typography>
                
            </Box>
            {location.pathname}
            <List>
                {
                    menuItems.map( (item) => (
                        <ListItemButton 
                        key={item.pos} 
                        onClick={ (e) => handleClick(e, item)}
                        selected={selectedIndex == item.pos}>
                            <ListItem>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}></ListItemText>
                            </ListItem>
                        </ListItemButton>
                        
                        
                    ))
                }
            </List>
        </Drawer>
        <Box sx={sx.content}>
            <Box sx={sx.toolbar}></Box>
            <Box pt={3}></Box>
            {children}
        </Box>
    </Box> 
  )
}



