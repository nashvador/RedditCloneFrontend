import { useNavigate } from "react-router-dom";

import { Button, Grid, Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import RedditIcon from "@mui/icons-material/Reddit";
import AvatarUser from "../Avatar/AvatarPage";

type user = {
  token: string;
  username: string;
  name: string;
};

const Header = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  let user: user | null = userJson !== null ? JSON.parse(userJson) : null;

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
          onClick={() => navigate("/")}
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
              <Button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Log out
              </Button>
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
