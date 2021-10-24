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
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      <Title>Opu Poro</Title>
      <Title>Batting Allrounder</Title>
    </React.Fragment>
  );
}