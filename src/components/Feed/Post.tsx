import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AvatarUser from "../Avatar/AvatarPage";
import Tooltip from "@mui/material/Tooltip";
import { post } from "./Feed";
import {
  compareDateWithPresent,
  compareCreatedAndUpdatedDates,
} from "../../helper/datesfunction";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const Post = ({
  postTitle,
  user,
  postContent,
  createdAt,
  updatedAt,
  commentCount,
  upVotes,
  id,
}: post) => {
  return (
    <Card
      sx={{
        minWidth: 500,
        padding: "1rem",
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
        <Stack
          direction="column"
          justifyItems="center"
          alignItems="center"
          paddingRight={1}
        >
          <ArrowUpwardIcon
            sx={{
              ":hover": {
                color: "#FF4500",
              },
            }}
          ></ArrowUpwardIcon>
          <Typography variant="body2">{upVotes}</Typography>
          <ArrowDownwardIcon
            sx={{
              ":hover": {
                color: "#453BB5",
              },
            }}
          ></ArrowDownwardIcon>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            justifyItems="center"
            alignItems="center"
            spacing={1}
          >
            <Typography>Posted by {user.username}</Typography>
            <AvatarUser username={user.username} width={30} height={30} />
            <Typography variant="body2">
              {compareDateWithPresent(createdAt)} days ago
            </Typography>
            {!compareCreatedAndUpdatedDates(createdAt, updatedAt) ? (
              <Tooltip title={new Date(updatedAt).toDateString()}>
                <Typography variant="subtitle2">(edited)</Typography>
              </Tooltip>
            ) : null}
          </Stack>

          <Typography variant="h4">{postTitle}</Typography>
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
