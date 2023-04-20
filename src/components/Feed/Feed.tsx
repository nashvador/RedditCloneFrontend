import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid/Grid";
import { CircularProgress } from "@mui/material";
import { Post } from "./Post";
import { CreatePostAndSorter } from "./CreatePostAndSorter";
import { userAuthorizationFunction } from "../../helper/authentication";

export type post = {
  commentCount: number;
  createdAt: Date;
  id: number;
  postContent: string;
  postTitle: string;
  upVotes: number;
  updatedAt: Date;
  edited: boolean;
  user: { username: string };
  likes?: { likeOrDislike: boolean }[];
};

export type comment = {
  id: number;
  commentText: string;
  upVotes: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
  commentRespondToId: number | null;
  edited: boolean;
  post: { postTitle: string };
  user: { username: string };
};

export const Feed = ({
  postUrl,
  userUrl,
  newsFeed,
}: {
  postUrl: string;
  userUrl: string | undefined;
  newsFeed: boolean;
}): JSX.Element => {
  const [feedData, setFeedData] = useState<Array<post> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortLink, setSortLink] = useState<string>("earliest");

  // UseCallback Hook for deleting feed

  useEffect(() => {
    const getFeedDataFromBackend = async (
      url: string,
      requestParams: string = ""
    ): Promise<void> => {
      const feedDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! +
          url +
          requestParams +
          `?order=${sortLink}`,
        userAuthorizationFunction()!
      );
      setFeedData(feedDataFromBackend.data);
      setLoading(false);
    };
    getFeedDataFromBackend(postUrl, userUrl);
  }, [sortLink]);

  const feedComponent = (): JSX.Element[] | null => {
    if (feedData) {
      return feedData.map((postItem: post) => (
        <Grid item key={postItem.id}>
          <Post
            postTitle={postItem.postTitle}
            user={postItem.user}
            commentCount={postItem.commentCount}
            postContent={postItem.postContent}
            id={postItem.id}
            upVotes={postItem.upVotes}
            createdAt={postItem.createdAt}
            updatedAt={postItem.updatedAt}
            key={postItem.id}
            likes={postItem.likes ? postItem.likes : undefined}
            edited={postItem.edited}
          />
        </Grid>
      ));
    }
    return null;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {newsFeed ? (
          <CreatePostAndSorter
            sortLink={sortLink}
            setSortLink={setSortLink}
            setLoading={setLoading}
          />
        ) : null}
      </Grid>
      {loading ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
        feedComponent()
      )}
    </Grid>
  );
};
