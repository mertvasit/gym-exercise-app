import React from "react";
import axios from "axios";

import { Provider } from "../src/Context";
import { AuthContext } from "./Auth";

import PrivateRoute from "./Pages/PrivateRoute";
import Admin from "./Pages/Admin";
import HomePage from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Exercise from "./Components/Exercises";
import { muscles } from "./Components/Data";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import Loading from "../src/Loading.svg";

// import { Users } from "./Components/Users";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends React.Component {
  state = {
    exercises: [],
    user_credentials: [],
    categorySelected: "all",
    exerciseSelected: "",
    exerciseState: {},
    loading: false,
    LoggedIn: false,
    schedule: [],
    LoggedUserDetails: {
      LoggedUsername: "",
      avatarPicture: "",
    },
    openSnack: false,
  };

  getExerciseByMuscle() {
    const initExercise = muscles.reduce(
      (exercises, category) => ({ ...exercises, [category]: [] }),
      {}
    );
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initExercise)
    );
  }

  handleCategorySelected = (newValue) => {
    this.setState({
      categorySelected: newValue,
    });
  };

  handleExerciseSelected = (id) => {
    this.setState(({ exercises }) => ({
      exerciseSelected: exercises.find((ex) => ex.id === id),
      editMode: false,
    }));
  };

  handleExerciseCreated = (exercise) => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise],
    }));

    const new_exercise = {
      username: this.state.LoggedUsername,
      id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      muscles: exercise.muscles,
      explanation: exercise.explanation,
    };

    axios
      .post("http://localhost:5000/exercises/add", new_exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  handleDeleteExercise = (id, _id) => {
    this.setState(({ exercises, editMode, exerciseSelected }) => ({
      exercises: exercises.filter((ex) => ex.id !== id),
      editMode: exerciseSelected.id === id ? false : editMode,
      exerciseSelected: exerciseSelected.id === id ? {} : exerciseSelected,
    }));

    axios
      .delete("http://localhost:5000/exercises/" + _id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error: ", err.data));
  };

  handleSelectedEdit = (id) => {
    this.setState(({ exercises }) => ({
      exerciseSelected: exercises.find((ex) => ex.id === id),
      editMode: true,
    }));
  };

  handleExerciseEdit = (exercise) => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter((ex) => ex.id !== exercise.id), exercise],
      exerciseSelected: exercise,
    }));

    console.log(exercise);
    const updated_exercise = {
      username: "mert",
      id: exercise.id,
      title: exercise.title,
      description: exercise.description,
      muscles: exercise.muscles,
      explanation: exercise.explanation,
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" + exercise._id,
        updated_exercise
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  handleUserExercises = (username) => {
    axios.get("http://localhost:5000/exercises").then((res) => {
      const user_exercises = res.data.filter(
        (exer) => exer.username == username
      );
      this.setState({ exercises: user_exercises });
    });
  };

  handleLogIn = (username, password) => {
    this.setState({ loading: true });
    axios.get("http://localhost:5000/users/").then((res) => {
      var checkUserExists = res.data.find(
        (userDetails) =>
          username == userDetails.username && password == userDetails.password
      );

      if (checkUserExists !== undefined) {
        this.handleUserExercises(username);
        this.setState({
          LoggedIn: true,
          loading: false,
          LoggedUserDetails: {
            LoggedUsername: username,
            avatar: checkUserExists.avatar,
          },
        });
      } else {
        console.log("user doesnt exists");
        this.setState({ userNotExist: true, openSnack: true });
      }
    });
    this.setState({ loading: false });
  };

  handleLogout = () => {
    this.setState({
      LoggedIn: false,
      exercises: [],
      categorySelected: "all",
      exerciseSelected: "",
      schedule: [],
    });
  };

  handleAddSchedule = (id) => {
    const { exercises } = this.state;
    var element = exercises.find((ex) => ex.id === id);

    if (!this.state.schedule.includes(element, 0)) {
      this.setState({
        schedule: [...this.state.schedule, element],
      });
    }
  };

  getContext = () => ({
    logout: this.handleLogout,
    muscles,
    ...this.state,
  });

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnack: false });
  };

  render() {
    const {
      exerciseSelected,
      categorySelected,
      editMode,
      LoggedIn,
      schedule,
      LoggedUserDetails,
      userNotExist,
      openSnack,
      loading,
    } = this.state;
    const exercises = this.getExerciseByMuscle();

    return (
      <Provider value={this.getContext()}>
        <AuthContext.Provider
          value={{
            // Users,
            LoggedIn,
            CheckUser: this.handleLogIn,
            LogOut: this.handleLogout,
            schedule,
            LoggedUserDetails,
            userNotExist,
            loading,
          }}
        >
          <Router>
            <CssBaseline />
            <Header onExerciseCreate={this.handleExerciseCreated} />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              {LoggedIn ? (
                <Route exact path="/exercise">
                  <Exercise
                    selectedExercise={exerciseSelected}
                    exercises={exercises}
                    muscles={muscles}
                    category={categorySelected}
                    editMode={editMode}
                    onSelect={this.handleExerciseSelected}
                    onDelete={this.handleDeleteExercise}
                    onSelectEdit={this.handleSelectedEdit}
                    onEdit={this.handleExerciseEdit}
                    onAddSchedule={this.handleAddSchedule}
                  />

                  <Footer
                    category={categorySelected}
                    muscles={muscles}
                    onSelect={this.handleCategorySelected}
                  />
                </Route>
              ) : (
                <Redirect to="/login" />
              )}
              <PrivateRoute path="/admin" component={Admin} />
            </Switch>
            <Snackbar
              open={openSnack}
              autoHideDuration={3000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="error">
                Access denied! Acount doesn't exists!
              </Alert>
            </Snackbar>
          </Router>
        </AuthContext.Provider>
      </Provider>
    );
  }
}

export default App;
