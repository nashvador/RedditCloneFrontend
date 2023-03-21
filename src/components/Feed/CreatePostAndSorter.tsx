import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const CreatePostAndSorter = () => {
  const navigate = useNavigate();

  const handleCreatePostNavigation = (): void => {
    if (localStorage.getItem("user") !== null || undefined) {
      navigate("/createPost");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ width: "530px", bgcolor: "background.paper" }}>
      <Card sx={{ height: "50px" }}>
        <Button onClick={handleCreatePostNavigation}>Create New Post</Button>
      </Card>
    </Box>
  );
};
