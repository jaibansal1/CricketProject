import * as React from 'react';
import Title from './Title';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';


function preventDefault(event) {
  event.preventDefault();
}

export default function AvatarCard() {
  return (
    <React.Fragment>
      <Avatar sx={{ height: 60, width: 60, mx:"auto", my:3, gcolor: deepPurple[500] }}>OP</Avatar>
      <Box sx={{ mx:"auto", my:0.6}}><Title>Opu Poro</Title></Box>
      <Box sx={{ mx:"auto", my:0.6}}><Title>Batting Allrounder</Title></Box>
    </React.Fragment>
  );
}