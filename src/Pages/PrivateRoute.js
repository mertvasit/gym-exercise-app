import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { LoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        LoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
