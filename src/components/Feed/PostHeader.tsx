import { Dispatch, SetStateAction } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AvatarUser from "../Avatar/AvatarPage";
import { compareDateWithPresent } from "../../helper/datesfunction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { returnParsedToken } from "../../helper/authentication";

import { useNavigate } from "react-router-dom";

export const PostHeader = ({
  createdAt,
  updatedAt,
  user,
  editingInfo,
  setEditingInfo,
  deleteInfo,
  setDeleteInfo,
  edited,
}: {
  createdAt: Date;
  updatedAt: Date;
  user: { username: string };
  editingInfo: boolean;
  setEditingInfo: Dispatch<SetStateAction<boolean>>;
  deleteInfo: boolean;
  setDeleteInfo: Dispatch<SetStateAction<boolean>>;
  edited: boolean;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        alignSelf="flex-start"
      >
        <Typography
          onClick={() => navigate(`user/${user.username}`)}
          sx={{
            ":hover": {
              textDecoration: "underline #000000",
            },
          }}
        >
          Posted by {user.username}
        </Typography>
        <AvatarUser username={user.username} width={30} height={30} />
        <Typography variant="body2">
          {compareDateWithPresent(createdAt)} day
          {compareDateWithPresent(createdAt) > 1 ? "s" : ""} ago
        </Typography>
        {edited ? <Typography variant="subtitle2">(edited)</Typography> : null}
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
