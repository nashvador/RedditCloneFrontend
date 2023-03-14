import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/loginPage";
import { isLoggedIn } from "./helper/authentication";
import { UserPage } from "./components/Authentication/userPage";
import "./App.css";
import { Header } from "./components/Header/header";
import { Grid } from "@mui/material";

export const UserContext = createContext({} as any);

function App() {
  const [user, setUser] = useState<string | null>(isLoggedIn);

  return (
    <UserContext.Provider value={user}>
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
          <UserPage />
        </Grid>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
