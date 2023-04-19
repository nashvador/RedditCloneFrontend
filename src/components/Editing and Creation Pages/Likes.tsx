import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import { userAuthorizationFunction } from "../../helper/authentication";

export const Likes = ({
  upVotes,
  likeOrDislike,
  postId,
}: {
  upVotes: number;
  likeOrDislike: boolean | undefined;
  postId: number;
}) => {
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [amountOfUpVotes, setAmountOfUpVotes] = useState<number>(upVotes);

  useEffect(() => {
    if (likeOrDislike) {
      setLiked(true);
    } else if (likeOrDislike === false) setLiked(false);
  }, []);

  const onClickUpVote = async (): Promise<void> => {
    const likePostRequest = await axios.post(
      process.env.REACT_APP_API_ENDPOINT! + `api/like/postIdUpVote/${postId}`,
      undefined,
      userAuthorizationFunction()!
    );
    if (liked && likePostRequest && likePostRequest.status === 201) {
      setLiked(undefined);
      setAmountOfUpVotes((upVotes) => upVotes - 1);
    } else if (
      liked === undefined &&
      likePostRequest &&
      likePostRequest.status === 200
    ) {
      setLiked(true);
      setAmountOfUpVotes((upVotes) => upVotes + 1);
    } else if (
      liked === false &&
      likePostRequest &&
      likePostRequest.status === 201
    ) {
      setLiked(true);
      setAmountOfUpVotes((upVotes) => upVotes + 2);
    }
  };

  const onClickDownVote = async (): Promise<void> => {
    const likePostRequest = await axios.post(
      process.env.REACT_APP_API_ENDPOINT! + `api/like/postIdDownVote/${postId}`,
      undefined,
      userAuthorizationFunction()!
    );
    if (liked && likePostRequest && likePostRequest.status === 201) {
      setLiked(false);
      setAmountOfUpVotes((upVotes) => upVotes - 2);
    } else if (
      liked === undefined &&
      likePostRequest &&
      likePostRequest.status === 200
    ) {
      setLiked(false);
      setAmountOfUpVotes((upVotes) => upVotes - 1);
    } else if (
      liked === false &&
      likePostRequest &&
      likePostRequest.status === 201
    ) {
      setLiked(undefined);
      setAmountOfUpVotes((upVotes) => upVotes + 1);
    }
  };

  return (
    <Stack
      direction="column"
      justifyItems="center"
      alignItems="center"
      padding={1}
      sx={{
        backgroundColor: "grey.100",
      }}
    >
      <ArrowUpwardIcon
        sx={{
          color: liked ? "#FF4500" : "inherit",
          ":hover": {
            color: liked ? "inherit" : "#FF4500",
          },
        }}
        onClick={onClickUpVote}
      ></ArrowUpwardIcon>
      <Typography variant="body2">{amountOfUpVotes}</Typography>
      <ArrowDownwardIcon
        sx={{
          color: liked === false ? "#453BB5" : "inherit",
          ":hover": {
            color: liked === false ? "inherit" : "#453BB5",
          },
        }}
        onClick={onClickDownVote}
      ></ArrowDownwardIcon>
    </Stack>
  );
};
