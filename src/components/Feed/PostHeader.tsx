import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AvatarUser from "../Avatar/AvatarPage";
import {
  compareCreatedAndUpdatedDates,
  compareDateWithPresent,
} from "../../helper/datesfunction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { returnParsedToken } from "../../helper/authentication";

export const PostHeader = ({
  createdAt,
  updatedAt,
  user,
}: {
  createdAt: Date;
  updatedAt: Date;
  user: { username: string };
}): JSX.Element => {
  const [editingInfo, setEditingInfo] = useState<boolean>(false);
  const [deleteInfo, setDeleteInfo] = useState<boolean>(false);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        alignSelf="flex-start"
      >
        <Typography>Posted by {user.username}</Typography>
        <AvatarUser username={user.username} width={30} height={30} />
        <Typography variant="body2">
          {compareDateWithPresent(createdAt)} day
          {compareDateWithPresent(createdAt) > 1 ? "s" : ""} ago
        </Typography>
        {compareCreatedAndUpdatedDates(createdAt, updatedAt) ? (
          ""
        ) : (
          <Typography variant="subtitle2">(edited)</Typography>
        )}
      </Stack>
      {(returnParsedToken() &&
        returnParsedToken()?.username === user.username) ||
      returnParsedToken()?.admin ? (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
          alignSelf="flex-end"
        >
          {editingInfo ? (
            <ClearIcon onClick={() => setEditingInfo(false)} />
          ) : (
            <EditIcon onClick={() => setEditingInfo(true)} />
          )}
          {deleteInfo ? (
            <CheckCircleIcon />
          ) : (
            <DeleteIcon onClick={() => setDeleteInfo(true)} />
          )}
        </Stack>
      ) : null}
    </Stack>
  );
};
