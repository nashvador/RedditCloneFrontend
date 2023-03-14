import { Avatar } from "@mui/material";

const AvatarUser = ({
  username,
  height,
  width,
}: {
  username: string | undefined;
  height: number;
  width: number;
}) => {
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightblue",
      }}
      src={"https://robohash.org/ " + username}
    />
  );
};

export default AvatarUser;
