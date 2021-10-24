import * as React from 'react';
import Title from './Title';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


function preventDefault(event) {
  event.preventDefault();
}

export default function Info() {
  return (
    <React.Fragment>
      <Title>Player Info</Title>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Opu Poro" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Sophomore" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Batting Allrounder" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Right Hand Bat" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Right Arm Medium Fast" />
          </ListItem>
        </List>
      </nav>
    </Box>
    </React.Fragment>
  );
}