import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./Post";
import Grid from "@mui/material/Grid/Grid";
import { CircularProgress } from "@mui/material";

import { comment, post } from "./Feed";
import { userAuthorizationFunction } from "../../helper/authentication";
import { useParams } from "react-router-dom";
import { CreateCommentTable } from "./CreateCommentTable";
import Comment from "./Comment";

export const PostPage = () => {
  const [individualPostInfo, SetIndividualPostInfo] = useState<post | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [postloading, setPostLoading] = useState<boolean>(true);
  const [contentInfo, setContentInfo] = useState<string>("");
  const [commnentloading, setCommentLoading] = useState<boolean>(true);
  const [commentInfo, setCommentData] = useState<comment | null>(null);

  const postId = useParams().id;

  const getPostDataFromBackend = async (
    url: string,
    requestParams: string = ""
  ): Promise<void> => {
    try {
      const postDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + url + requestParams,
        userAuthorizationFunction()!
      );
      SetIndividualPostInfo(postDataFromBackend.data);
      setPostLoading(false);
    } catch (err: any) {
      setErrorMessage(err.response.data.error);
    }
  };

  const getCommentDataFromBackend = async (url: string): Promise<void> => {
    try {
      const commentDataFromBackend = await axios.get(
        process.env.REACT_APP_API_ENDPOINT! + url
      );
      console.log(commentDataFromBackend.data);
      setCommentData(commentDataFromBackend.data);
      setCommentLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDataFromBackend("api/post/", postId);
    getCommentDataFromBackend(`api/comment/postId/${postId}`);
  }, [postId]);

  console.log(commentInfo);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {!postloading && individualPostInfo ? (
        <Grid item xs={12}>
          <Post
            postTitle={individualPostInfo.postTitle}
            user={individualPostInfo.user}
            commentCount={individualPostInfo.commentCount}
            postContent={individualPostInfo.postContent}
            id={individualPostInfo.id}
            upVotes={individualPostInfo.upVotes}
            createdAt={individualPostInfo.createdAt}
            updatedAt={individualPostInfo.updatedAt}
            key={individualPostInfo.id}
            likes={
              individualPostInfo.likes ? individualPostInfo.likes : undefined
            }
            edited={individualPostInfo.edited}
          />
        </Grid>
      ) : (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12} md={9} maxWidth="100%">
        <CreateCommentTable
          contentInfo={contentInfo}
          setContentInfo={setContentInfo}
          url=""
        />
      </Grid>
      {!commnentloading && commentInfo ? (
        <Grid item>
          <Comment comment={commentInfo} />{" "}
        </Grid>
      ) : (
        <Grid>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};
