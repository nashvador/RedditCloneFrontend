import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../helper/authentication";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const CreatePostAndSorter = ({
  sortLink,
  setSortLink,
  setLoading,
}: {
  sortLink: string;
  setSortLink: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const navigate = useNavigate();

  const handleCreatePostNavigation = (): void => {
    if (isLoggedIn !== null || undefined) {
      navigate("/createPost");
    } else {
      navigate("/login");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSortLink(event.target.value as string);
    console.log(event.target.value);
    setLoading(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "500px",
        bgcolor: "background.paper",
      }}
    >
      <Card
        sx={{
          height: "80px",
          width: "500px",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <Button
          sx={{ border: "1px solid black" }}
          onClick={handleCreatePostNavigation}
        >
          Create New Post
        </Button>
        <FormControl sx={{ minWidth: "180px", marginLeft: "auto" }}>
          <InputLabel id="sortLabel">Sort By</InputLabel>
          <Select
            labelId="sortLabel"
            id="sortLabel"
            value={sortLink}
            label="Sort By"
            onChange={handleChange}
          >
            <MenuItem value="earliest">Earliest</MenuItem>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="comment">Comment Number</MenuItem>
            <MenuItem value="likes">Like Number</MenuItem>
          </Select>
        </FormControl>
      </Card>
    </Box>
  );
};
