import { SyntheticEvent, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";

export const CenteredProfileNavBar = ({
  userPageEqualsUser,
}: {
  userPageEqualsUser: boolean;
}) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: userPageEqualsUser ? "550px" : "350px",
        bgcolor: "background.paper",
      }}
    >
      <Card>
        {userPageEqualsUser ? (
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Posts" />
            <Tab label="Comments" />
            <Tab label="UpVoted" />
            <Tab label="DownVoted" />
            <Tab label="Saved" />
          </Tabs>
        ) : (
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Posts" />
            <Tab label="Comments" />
            <Tab label="UpVoted" />
          </Tabs>
        )}
      </Card>
    </Box>
  );
};
