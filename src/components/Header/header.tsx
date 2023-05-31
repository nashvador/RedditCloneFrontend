import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Grid, TextField, Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import RedditIcon from "@mui/icons-material/Reddit";
import AvatarUser from "../Avatar/AvatarPage";

import { connectSocketToBackend, user } from "../../helper/authentication";

const Header = ({
  setSearchValue,
  setSearchValueBoolean,
}: {
  setSearchValue: Dispatch<SetStateAction<string | null>>;
  setSearchValueBoolean: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  let user: user | null = userJson !== null ? JSON.parse(userJson) : null;

  const handleLogout = (): void => {
    const socket = connectSocketToBackend();
    console.log(socket);
    socket?.disconnect();

    localStorage.clear();
    navigate("/login");
  };

  const handleReturnHome = (): void => {
    setSearchValue(null);
    setSearchValueBoolean(false);
    navigate("/");
  };

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      alignItems="center"
      justifyContent="center"
      marginBottom="2rem"
    >
      <Grid item>
        <RedditIcon
          sx={{
            ":hover": {
              color: "#FF4500",
              cursor: "pointer",
            },
          }}
          onClick={handleReturnHome}
        />
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
              <Typography>{user.username}</Typography>
            </Grid>
            <Grid
              item
              sx={{
                ":hover": {
                  borderColor: "black",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/user/${user?.username}`)}
            >
              <AvatarUser username={user.username} height={30} width={30} />
            </Grid>
            <Grid item>
              <MessageIcon sx={{ height: 30, width: 30 }} />
            </Grid>
            <Grid item>
              <Button onClick={handleLogout}>Log out</Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Button onClick={() => navigate("/login")}>Log in</Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export { Header };
