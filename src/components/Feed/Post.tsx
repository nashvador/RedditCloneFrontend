import { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import { post } from "./Feed";
import { Likes } from "../Editing and Creation Pages/Likes";
import { PostHeader } from "./PostHeader";
import { PostCommentEditor } from "./PostCommentEditor";
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
  edited,
}: post): JSX.Element => {
  const [editingInfo, setEditingInfo] = useState<boolean>(false);
  const [deleteInfo, setDeleteInfo] = useState<boolean>(false);
  const [contentInfo, setContentInfo] = useState<string>(postContent);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minWidth: "30rem",
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
        <Stack
          direction="column"
          spacing={1}
          padding={1}
          onClick={() => navigate(`/post/${id}`)}
        >
          <PostHeader
            user={user}
            createdAt={createdAt}
            updatedAt={updatedAt}
            editingInfo={editingInfo}
            setEditingInfo={setEditingInfo}
            deleteInfo={deleteInfo}
            setDeleteInfo={setDeleteInfo}
            edited={edited}
          />
          <Typography variant="h5">{postTitle}</Typography>
          {editingInfo ? (
            <PostCommentEditor
              setEditingInfo={setEditingInfo}
              contentInfo={contentInfo}
              setContentInfo={setContentInfo}
              url={`api/post/${id}`}
            />
          ) : (
            <Typography variant="body1">{contentInfo}</Typography>
          )}
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
