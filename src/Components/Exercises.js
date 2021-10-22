import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core";

import {
  Grid,
  Paper,
  Typography,
  List,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import Form from "./Form";

import {
  Snackbar,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Tooltip,
} from "@material-ui/core";

//icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  Paper: {
    padding: 15,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 20px)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      overflowY: "auto",
    },
  },
  "@global": {
    "html, body, #root": {
      height: "100%",
      overflowY: "auto",
    },
  },
  container: {
    flexGrow: 1,
    marginTop: "60px",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 64px)",
      // overflowY: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 56px - 64px)",
      overflowY: "auto",
    },
    item: {
      [theme.breakpoints.down("xs")]: {
        height: "50%",
      },
    },
  },
  Card: {
    height: "540px",
    overflowY: "auto",
  },
});

export default withStyles(styles)(function Exercise({
  muscles,
  exercises,
  category,
  onSelect,
  editMode,
  onEdit,
  onSelectEdit,
  onAddSchedule,
  selectedExercise,
  selectedExercise: {
    id = "",
    title = "Welcome!",
    explanation = "Please select a category from below.",
  },
  onDelete,
  classes,
}) {
  const [openSnack, setOpenSnack] = useState(false);

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.Paper}>
            {editMode ? (
              <Fragment>
                <Typography
                  variant="h3"
                  align="center"
                  color="textSecondary"
                  gutterBottom
                >
                  {title}
                </Typography>
                <Form
                  key={id}
                  exercise={selectedExercise}
                  muscles={muscles}
                  onSubmit={onEdit}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Card className={classes.Card}>
                  <CardContent>
                    <Typography variant="h3" gutterBottom>
                      {title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {explanation}
                    </Typography>
                  </CardContent>
                </Card>
              </Fragment>
            )}
          </Paper>
        </Grid>
        <hr />
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.Paper}>
            <Card className={classes.Card}>
              {exercises.map(([group, exercises]) => {
                return !category || category === group ? (
                  <Fragment key={group}>
                    <Typography
                      key={group}
                      variant="h5"
                      style={{ textTransform: "capitalize" }}
                    >
                      {group}
                    </Typography>
                    <List component="ul">
                      {exercises.map(({ title, id, _id }) => (
                        <ListItem key={id} button>
                          <ListItemText
                            primary={title}
                            onClick={() => onSelect(id)}
                          />
                          <ListItemSecondaryAction>
                            <Tooltip title="Add to Daily Schedule">
                              <IconButton
                                onClick={() => {
                                  onAddSchedule(id);
                                  setOpenSnack((prevState) => !prevState);
                                }}
                              >
                                <PostAddIcon />
                              </IconButton>
                            </Tooltip>
                            <IconButton
                              onClick={() => {
                                onSelectEdit(id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                onDelete(id, _id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Fragment>
                ) : null;
              })}
            </Card>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => {
          setOpenSnack((prevState) => !prevState);
        }}
        message="Added to your schedule!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setOpenSnack((prevState) => !prevState);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Fragment>
  );
});
