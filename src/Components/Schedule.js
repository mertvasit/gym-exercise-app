import React, { Component, Fragment, useState } from "react";

import { EventNote, SettingsSharp } from "@material-ui/icons";

import { useAuth } from "../Auth";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  List,
  ListItemSecondaryAction,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function Schedule() {
  const [toggle, setToggle] = useState(false);
  const [reps, setReps] = useState();
  const { schedule } = useAuth();

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "5px" }}
        onClick={handleToggle}
      >
        <EventNote />
      </Button>
      <Dialog open={toggle} onClose={handleToggle} fullWidth maxWidth="md">
        <DialogTitle>Manage Your Daily Schedule</DialogTitle>
        <DialogContent>
          {schedule.length == 0 ? (
            <DialogContentText>
              Opps...Don't have a schedule yet!
            </DialogContentText>
          ) : (
            <DialogContentText>
              Check out your daily schedule!
            </DialogContentText>
          )}{" "}
          <Grid container spacing={2}>
            <Grid item xs>
              <List component="ul">
                {schedule.map(({ title, id }) => (
                  <ListItem key={id} button>
                    <ListItemText primary={title} />

                    <FormControl
                      variant="outlined"
                      // className={classes.formControl}
                      style={{ minWidth: "120px", marginRight: "20px" }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Reps
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={reps}
                        onChange={(event) => {
                          setReps(event.target.value);
                        }}
                        label="Reps"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                      </Select>
                    </FormControl>

                    <ListItemSecondaryAction>
                      <IconButton>
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default Schedule;
