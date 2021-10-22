import React, { Component, Fragment } from "react";
import {
  TextField,
  Snackbar,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exer: this.getInitState(), openSnack: false };
  }

  getInitState() {
    const { exercise } = this.props;
    var new_exercise = {
      ...exercise,
      // openSnack: false,
    };
    return new_exercise
      ? new_exercise
      : {
          id: "",
          title: "",
          description: "",
          muscles: "",
          explanation: "",
        };
  }

  handleForm = (name) => ({ target: { value } }) => {
    this.setState({
      exer: { ...this.state.exer, [name]: value },
    });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.state.exer.title.toLocaleLowerCase().replace(/ /g, "-"),
      ...this.state.exer,
    });

    this.setState((prevState) => ({
      ...prevState,
      openSnack: true,
    }));
  };

  render() {
    const {
      title,
      description,
      muscles,
      explanation,
      openSnack,
    } = this.state.exer;

    return (
      <form action="">
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          value={title}
          onChange={this.handleForm("title")}
          fullWidth
        />
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Muscle</InputLabel>
          <Select
            value={muscles}
            name="muscles"
            onChange={this.handleForm("muscles")}
            autoWidth={true}
          >
            {this.props.muscles.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          value={description}
          name="description"
          label="Description"
          onChange={this.handleForm("description")}
          fullWidth
        />

        <TextField
          margin="normal"
          value={explanation}
          label="Explanation"
          onChange={this.handleForm("explanation")}
          multiline
          rows={4}
          fullWidth
        />
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="secondary"
          disabled={!title || !muscles}
        >
          {this.props.exercise ? "Edit" : "Create"}
        </Button>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnack}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ openSnack: false });
          }}
          message="Saved!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                  this.setState({ openSnack: false });
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
    );
  }
}

export default Form;
