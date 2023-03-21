import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import AvatarUser from "../Avatar/AvatarPage";
import Typography from "@mui/material/Typography";
import { compareDateWithPresent } from "../../helper/datesfunction";
import { Stack } from "@mui/material";

type userCardInfoType = {
  id: number;
  username: string;
  name: string;
  commentKarma: number;
  postKarma: number;
  admin: boolean;
  disabled: boolean;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UserProfile = ({
  userCardInfo,
}: {
  userCardInfo: userCardInfoType;
}) => {
  const { username, commentKarma, postKarma, admin, disabled, tag, createdAt } =
    userCardInfo;

  const adminOrDisabledColor = (): object => {
    if (admin) return { color: "green" };
    if (disabled) return { color: "red" };
    else return { color: "black" };
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
    >
      <Card>
        <CardContent>
          <Stack
            direction="column"
            alignItems="center"
            justifyItems="center"
            spacing={1}
          >
            <AvatarUser username={username} width={100} height={100} />
            <Typography variant="h5" sx={adminOrDisabledColor}>
              {username} {tag ? `(${tag})` : ""}
            </Typography>
            <Typography>Comment Karma: {commentKarma}</Typography>
            <Typography>Post Karma: {postKarma}</Typography>
            <Typography variant="body2">
              fedditor for {compareDateWithPresent(createdAt)} days{" "}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
