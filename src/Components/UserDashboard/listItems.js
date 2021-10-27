import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Link from "@mui/material/Link";


export const mainListItems = (
  <div>
    <ListItem button>
    <Link href="/AdminDashboard" underline = "none">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Roster" /></Link>
    </ListItem>
    <ListItem button>
    <Link href="/EventCalendar" underline = "none">
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Event Calendar" /></Link>
    </ListItem>
    <ListItem button>
    <Link href="/UserProfile" underline = "none">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile Page" /></Link>
    </ListItem>
  </div>
);