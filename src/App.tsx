import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Authentication/loginPage";
import { UserPage } from "./components/UserPages/userPage";
import { Header } from "./components/Header/header";
import { Grid, TextField } from "@mui/material";
import { Feed } from "./components/Feed/Feed";
import { CreatePost } from "./components/Editing and Creation Pages/CreatePost";
import SignUp from "./components/Authentication/SignupPage";

import { connectSocketToBackend } from "./helper/authentication";
import Comments from "./components/Feed/Comment";
import { PostPage } from "./components/Feed/PostPage";

function App() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchValueBoolean, setSearchValueBoolean] = useState<boolean>(false);
  // Put useeffect
  // const socket = connectSocketToBackend();
  // console.log(socket);
  // socket?.connect();
  // socket?.emit("message", { text: "Hello, server!" });
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="top"
      padding="1rem"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={9} mt={2}>
        <Header
          setSearchValue={setSearchValue}
          setSearchValueBoolean={setSearchValueBoolean}
        />
      </Grid>
      <Grid item xs={12} md={9} mb={2}>
        <TextField
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSearchValue((event.target as HTMLInputElement).value);
              setSearchValueBoolean(true);
            }
          }}
          helperText="Press Enter to Search Posts"
        ></TextField>
      </Grid>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route
          path="/"
          element={
            <Grid item xs={12} md={9}>
              <Feed
                postUrl="api/post"
                userUrl=""
                newsFeed={true}
                searchValue={searchValue}
                searchValueBoolean={searchValueBoolean}
              />
            </Grid>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Grid item xs={12} md={9}>
              <PostPage />
            </Grid>
          }
        />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/comment" element={<Comments />} />
      </Routes>
    </Grid>
  );
}

export default App;
