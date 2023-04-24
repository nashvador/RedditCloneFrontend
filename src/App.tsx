import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/loginPage";
import { UserPage } from "./components/UserPages/userPage";
import "./App.css";
import { Header } from "./components/Header/header";
import { Grid } from "@mui/material";
import { Feed } from "./components/Feed/Feed";
import { CreatePost } from "./components/Editing and Creation Pages/CreatePost";
import SignUp from "./components/Authentication/SignupPage";

import { connectSocketToBackend } from "./helper/authentication";
import Comments from "./components/Feed/Comment";

function App() {
  // Put useeffect
  const socket = connectSocketToBackend();
  console.log(socket);
  socket?.connect();
  socket?.emit("message", { text: "Hello, server!" });
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
        <Route
          path="/"
          element={<Feed postUrl="api/post" userUrl="" newsFeed={true} />}
        />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/comment" element={<Comments />} />
      </Routes>
    </Grid>
  );
}

export default App;
