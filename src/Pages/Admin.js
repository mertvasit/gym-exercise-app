import React from "react";
import { useAuth } from "../Auth";

import { Button } from "@material-ui/core";

function Admin(props) {
  const { LogOut } = useAuth();

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Admin Page</h1>
      <Button onClick={LogOut}>Log out</Button>
    </div>
  );
}

export default Admin;
