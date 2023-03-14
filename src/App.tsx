import React from "react";
import "./App.css";
import { Header } from "./Header/header";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="top"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={9}>
        <Header />
      </Grid>
    </Grid>
  );
}

export default App;
