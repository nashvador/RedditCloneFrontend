import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";

export const CenteredProfileNavBar = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "350px", bgcolor: "background.paper" }}>
      <Card>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Posts" />
          <Tab label="Comments" />
          <Tab label="Likes" />
        </Tabs>
      </Card>
    </Box>
  );
};
