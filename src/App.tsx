import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/loginPage";
import "./App.css";
import { Header } from "./components/Header/header";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="top"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={9} md={9}>
        <Header />
      </Grid>
      <Routes>
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Grid>
  );
}

export default App;
