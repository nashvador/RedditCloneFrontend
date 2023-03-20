import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/loginPage";
import { isLoggedIn } from "./helper/authentication";
import { UserPage } from "./components/UserPages/userPage";
import "./App.css";
import { Header } from "./components/Header/header";
import { Grid } from "@mui/material";
import { Feed } from "./components/Feed/Feed";

function App() {
  const [user, setUser] = useState<string | null>(isLoggedIn());
  console.log(user);

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
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </Grid>
  );
}

export default App;
