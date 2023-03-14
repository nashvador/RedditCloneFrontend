import AvatarUser from "../Avatar/AvatarPage";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

export const UserPage = () => {
  const username = useParams().id;
  const [userPageInfo, setUserPageInfo] = useState<any>({});

  useEffect(() => {
    const getUserPageInfo = async () => {
      const userInfoFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + "api/users/" + username
      );
      setUserPageInfo(userInfoFromBackend.data);
    };
    getUserPageInfo();
  }, [username]);
  console.log(userPageInfo);
  // const user = JSON.parse(useContext(UserContext));
  // const { username } = user;
  // console.log(username);
  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={9} md={9}>
        <AvatarUser username={username} height={100} width={100} />
      </Grid>
    </Grid>
  );
};
