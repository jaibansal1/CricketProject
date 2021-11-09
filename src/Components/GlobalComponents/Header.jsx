import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Text } from "recharts";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../StyledComponents/StyledComponents";
import { logout } from "../../Services/firebase";

const Header = (props) => {
  return (
    <Toolbar
      sx={{
        pr: "24px", // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.toggleProp}
        sx={{
          marginRight: "36px",
          ...(props.openProp && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {props.titleProp}
      </Typography>
      <Button variant="contained" onClick={logout}>
        Log Out
      </Button>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Text>{props.dataProp.name}</Text>
      <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>
    </Toolbar>
  );
};
export default Header;
