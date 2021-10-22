import React, { useState } from "react";
import axios from "axios";

import "../LoginPageTheme.css";

import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { Card, CardContent } from "@material-ui/core";

import { Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Card: {
    position: "absolute",
    top: " 50%",
    left: "50%",
    marginTight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  CardHeader: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "40px",
  },
  SignUpHere: {
    textAlign: "right",
    color: "black",
  },
  LoginButton: {
    borderRadius: "20px",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignUp(props) {
  const classes = useStyles(props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSaved(false);
  };

  const handleAddUserToDb = () => {
    const newUser = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => {
        setIsSaved((prevState) => !prevState);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <Grid container className="body">
      <Grid item xs={12}>
        <Card className={classes.Card}>
          <CardContent>
            <h1 className={classes.CardHeader}>Sign Up</h1>
            <TextField
              value={username}
              label="Name"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />{" "}
            <TextField
              value={password}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword((prevState) => !prevState);
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Typography
              className={classes.SignUpHere}
              variant="subtitle2"
              gutterBottom
            >
              Already a member? <Link to="/login">Login here</Link>
            </Typography>
            <Button
              className={classes.LoginButton}
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleAddUserToDb}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar open={isSaved} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Account saved successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default SignUp;
