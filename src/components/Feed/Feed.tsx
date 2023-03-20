import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card/Card";

type post = {
  commentCount: number;
  createdAt: Date;
  id: number;
  postContent: string;
  postTitle: string;
  upVotes: string;
  updatedAt: Date;
  user: { username: string };
};

export const Feed = () => {
  const [feedData, setFeedData] = useState<post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showing, setShowing] = useState<boolean>(false);

  useEffect(() => {
    const getFeedDataFromBackend = async (): Promise<void> => {
      const feedDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + "api/post"
      );
      setFeedData(feedDataFromBackend.data);
      setLoading(false);
    };
    getFeedDataFromBackend();
  }, []);
  console.log(feedData);
  return <Grid container>{loading ? "spinner" : "test"}</Grid>;
};
