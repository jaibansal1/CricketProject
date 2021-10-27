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
    <Link href="/AdminDashboard" underline = "none">
      <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Roster" />
    </ListItem>
    </Link>
    <Link href="/EventCalendar" underline = "none">
      <ListItem button>
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Event Calendar" />
    </ListItem>
    </Link>
    <Link href="/UserProfile" underline = "none"><ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile Page" />
    </ListItem>
    </Link>
  </div>
);