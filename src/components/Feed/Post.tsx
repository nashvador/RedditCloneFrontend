import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import { post } from "./Feed";
import { Likes } from "../Editing and Creation Pages/Likes";
import { PostHeader } from "./PostHeader";
export const Post = ({
  postTitle,
  user,
  postContent,
  createdAt,
  updatedAt,
  commentCount,
  upVotes,
  id,
  likes,
}: post): JSX.Element => {
  return (
    <Card
      sx={{
        minWidth: 500,
        // padding: "1rem",
        border: 1,
        borderColor: "white",
        ":hover": {
          borderColor: "black",
          cursor: "pointer",
        },
      }}
      key={id}
    >
      <Stack direction="row">
        <Likes
          upVotes={upVotes}
          likeOrDislike={
            likes && likes?.length > 0 ? likes[0].likeOrDislike : undefined
          }
          postId={id}
        />
        <Stack direction="column" spacing={1} padding={1}>
          <PostHeader user={user} createdAt={createdAt} updatedAt={updatedAt} />
          <Typography variant="h5">{postTitle}</Typography>
          <Typography variant="body1">{postContent}</Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyItems="center"
            alignItems="center"
          >
            <Typography>{commentCount}</Typography>
            <CommentIcon />
            <Typography
              variant="body2"
              sx={{
                ":hover": {
                  textDecoration: "underline #000000",
                },
              }}
            >
              Save
            </Typography>
            <Typography
              variant="body2"
              sx={{
                ":hover": {
                  textDecoration: "underline #000000",
                },
              }}
            >
              Report
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
