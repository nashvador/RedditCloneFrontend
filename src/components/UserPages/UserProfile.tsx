import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AvatarUser from "../Avatar/AvatarPage";
import Typography from "@mui/material/Typography";

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

  const compareDates = (): number => {
    const diff = new Date().getTime().valueOf() - new Date(createdAt).valueOf();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <AvatarUser username={username} width={100} height={100} />
          <Typography variant="h5" sx={adminOrDisabledColor}>
            {username} {tag ? `(${tag})` : ""}
          </Typography>
          <Typography>Comment Karma: {commentKarma}</Typography>
          <Typography>Post Karma: {postKarma}</Typography>
          <Typography variant="body2">
            fedditor for {compareDates()} days{" "}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
