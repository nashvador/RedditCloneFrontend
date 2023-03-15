import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";

export const UserPage = () => {
  const username = useParams().id?.toString();
  const [userCardInfo, setUserCardInfo] = useState<any>({});

  useEffect(() => {
    const getUserCardInfo = async () => {
      const userInfoFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + "api/users/" + username
      );
      setUserCardInfo(userInfoFromBackend.data);
    };
    getUserCardInfo();
  }, [username]);
  // const user = JSON.parse(useContext(UserContext));
  // const { username } = user;
  // console.log(username);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={9} md={9}>
        <UserProfile userCardInfo={userCardInfo} />
      </Grid>
    </Grid>
  );
};
