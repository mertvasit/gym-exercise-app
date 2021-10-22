import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Paper, Tabs, Tab } from "@material-ui/core";
import withWidth from "material-ui/utils/withWidth";

export default withWidth()(function Footer({
  muscles,
  category,
  onSelect,
  width,
}) {



  const index = category
    ? muscles.findIndex((group) => group === category) + 1
    : 0;

  const onIndexSelect = (e, index) =>
    onSelect(index == 0 ? "" : muscles[index - 1]);

  const displayMuscles = muscles.map((item) => {
    return <Tab key={item} label={item} />;
  });

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor="secondary"
        textColor="primary"
        centered={width > 2}
        variant={width <= 2 ? "scrollable" : "fullWidth"}
        scrollButtons="on"
      >
        <Tab label="ALL" />
        {displayMuscles}
      </Tabs>
    </Paper>
  );
});
