import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import Form from "./Form";

import { Add, ExitToApp } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { Consumer } from "../Context";

import ScheduleButton from "./Schedule";

class Create extends React.Component {
  constructor({ onEdit }) {
    super();
    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleFormSubmit = (exercise) => {
    this.handleToggle();
    this.props.onCreate(exercise);
  };

  handleRouting = (x) => {
    return x ? this.handleToggle : null;
  };

  render() {
    const { open } = this.state;
    // { categories } = this.props;

    return (
      <Consumer>
        {({ muscles, LoggedIn, logout }) => (
          <Fragment>
            {LoggedIn ? (
              <Fragment>
                <ScheduleButton />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "5px" }}
                  onClick={this.handleToggle}
                >
                  <Add />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "5px" }}
                  onClick={() => {
                    logout();
                  }}
                >
                  <ExitToApp />
                </Button>
              </Fragment>
            ) : (
              <Button variant="contained" color="secondary">
                <Link style={{ color: "white" }} to="/login">
                  Login
                </Link>
              </Button>
            )}
            <Dialog
              open={open}
              onClose={this.handleToggle}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle>Create a New Exercise</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill out the form below.
                </DialogContentText>
                <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default Create;
