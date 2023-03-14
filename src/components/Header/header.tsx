import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

import { Button, Grid, Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import RedditIcon from "@mui/icons-material/Reddit";

import AvatarUser from "../Avatar/AvatarPage";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(useContext(UserContext));
  const { username } = user;

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <RedditIcon />
      </Grid>
      <Grid item>
        {user ? (
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography>{username}</Typography>
            </Grid>
            <Grid item>
              <AvatarUser username={username} height={30} width={30} />
            </Grid>
            <Grid item>
              <MessageIcon sx={{ height: 30, width: 30 }} />
            </Grid>
            <Grid item>
              <Button>Log out</Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Button onClick={() => navigate("/login")}>Log in</Button>
            <Button>Sign up</Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export { Header };
