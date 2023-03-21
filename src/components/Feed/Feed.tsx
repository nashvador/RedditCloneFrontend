import { useState, useEffect, ReactComponentElement } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid/Grid";
import { Post } from "./Post";

export type post = {
  commentCount: number;
  createdAt: Date;
  id: number;
  postContent: string;
  postTitle: string;
  upVotes: string;
  updatedAt: Date;
  user: { username: string };
};

export const Feed = ({
  postUrl,
  userUrl,
}: {
  postUrl: string;
  userUrl: string | undefined;
}) => {
  const [feedData, setFeedData] = useState<Array<post> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFeedDataFromBackend = async (
      url: string,
      requestParams: string = ""
    ): Promise<void> => {
      const feedDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + url + requestParams
      );
      setFeedData(feedDataFromBackend.data);
      setLoading(false);
    };
    getFeedDataFromBackend(postUrl, userUrl);
  }, []);

  const feedComponent = () => {
    if (feedData) {
      return feedData.map((postItem: post) => (
        <Grid item>
          <Post
            postTitle={postItem.postTitle}
            user={postItem.user}
            commentCount={postItem.commentCount}
            postContent={postItem.postContent}
            id={postItem.id}
            upVotes={postItem.upVotes}
            createdAt={postItem.createdAt}
            updatedAt={postItem.updatedAt}
          />
        </Grid>
      ));
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {loading ? <div></div> : feedComponent()}
    </Grid>
  );
};
