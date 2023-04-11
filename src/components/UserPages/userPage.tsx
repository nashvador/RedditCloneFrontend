import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { CenteredProfileNavBar } from "./userProfileNavBar";
import CircularProgress from "@mui/material/CircularProgress";
import { Feed } from "../Feed/Feed";
import { isLoggedIn } from "../../helper/authentication";
import { Typography } from "@mui/material";

export type userCardInfoType = {
  id: number;
  username: string;
  name: string;
  commentKarma: number;
  postKarma: number;
  admin: boolean;
  disabled: boolean;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UserPage = () => {
  const username = useParams().id?.toString();
  const [userCardInfo, setUserCardInfo] = useState<userCardInfoType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserCardInfo = async (): Promise<void> => {
      const userInfoFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + "api/users/" + username
      );
      if (userInfoFromBackend) {
        setUserCardInfo(userInfoFromBackend.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getUserCardInfo();
  }, [username]);

  const userToken = isLoggedIn();
  let userPageEqualsUser: boolean = false;
  if (userToken) {
    if (username === JSON.parse(userToken).username) {
      userPageEqualsUser = true;
    }
  }

  function generateUserPage() {
    if (!loading && userCardInfo) {
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={9} md={9}>
            <UserProfile userCardInfo={userCardInfo} />
          </Grid>
          <Grid item>
            <CenteredProfileNavBar userPageEqualsUser={userPageEqualsUser} />
          </Grid>
          <Grid item>
            <Feed
              postUrl="api/post/userId/"
              userUrl={username}
              newsFeed={false}
            />
          </Grid>
        </Grid>
      );
    } else {
      if (!loading) {
        return (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Typography>The user you searched for does not exist</Typography>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        );
      }
    }
  }

  {
    return generateUserPage();
  }
};
