import React, { useState } from "react";
import "../LoginPageTheme.css";

import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../Auth";

//PHOTOES & SVG
import NikePicture from "../Images/nike.jpg";

//COMPONENTS
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//ICONS
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles({
  Card: {
    width: "65%",
    position: "absolute",
    top: " 50%",
    left: "50%",
    marginRight: "-50%",
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
  CoverImage: {
    backgroundImage: `url(${NikePicture})`,
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
});

function Login(props) {
  const classes = useStyles(props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { LoggedIn, CheckUser, loading } = useAuth();

  if (LoggedIn) {
    return <Redirect to="/exercise" />;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container className="body">
      <Card className={classes.Card}>
        <Grid container direction="row">
          <Grid item xs={9}>
            <CardContent>
              <h1 className={classes.CardHeader}>Login</h1>
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
                Not a member yet? <Link to="/signup">Sign up here</Link>
              </Typography>
              <Button
                className={classes.LoginButton}
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={() => {
                  CheckUser(username, password);
                }}
              >
                Login
              </Button>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.CoverImage}></div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Login;
