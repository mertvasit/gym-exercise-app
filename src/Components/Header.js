import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth";
import clsx from "clsx";

//COMPONENTS
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import CreateButton from "./Create";

//ICONS
import HomeIcon from "@material-ui/icons/Home";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  Avatar: {
    textAlign: "center",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Header({ onExerciseCreate, isLoggedIn }) {
  const classes = useStyles();
  const { LoggedIn, LogOut, LoggedUserDetails } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: "auto" }}>
            {LoggedIn
              ? `Hello ${LoggedUserDetails.LoggedUsername}!`
              : "Sup Madafkaa"}
          </Typography>
          {/* <CreateButton categories={muscles} onCreate={onExerciseCreate} /> */}
          <CreateButton onCreate={onExerciseCreate} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {LoggedIn && (
            <ListItem>
              <Avatar
                style={{ height: "100px", width: "100px", margin: "auto" }}
                src={LoggedUserDetails.avatar}
                // src="https://64.media.tumblr.com/78001b879b09831042707ca7c7e23ad9/6bbeef191956bb7b-95/s1280x1920/73a5b8360ef69f80229cfb0b9a566b7d01a8b6f2.jpg"
              />
            </ListItem>
          )}

          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link to="/">
              {" "}
              <ListItemText primary={"Home"} />
            </Link>
          </ListItem>

          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <Link to="/admin">
              {" "}
              <ListItemText primary={"Admin Page"} />
            </Link>
          </ListItem>

          {!LoggedIn && (
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to="/login">
                {" "}
                <ListItemText primary={"Login"} />
              </Link>
            </ListItem>
          )}

          {LoggedIn && (
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <Link to="/exercise">
                {" "}
                <ListItemText primary={"Exercises"} />
              </Link>
            </ListItem>
          )}

          {LoggedIn && (
            <ListItem
              button
              onClick={() => {
                LogOut();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <Link to="/">
                {" "}
                <ListItemText primary={"Sign Out"} />
              </Link>
            </ListItem>
          )}

          {/* <ListItem button>
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <Link to="/exercise">
              {" "}
              <ListItemText primary={"Exercises"} />
            </Link>
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
}
