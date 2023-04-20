import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { userAuthorizationFunction } from "../../helper/authentication";

export const PostCommentEditor = ({
  url,
  setContentInfo,
  setEditingInfo,
  contentInfo,
}: {
  url: string;
  contentInfo: string;
  setContentInfo: Dispatch<SetStateAction<string>>;
  setEditingInfo: Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentInfo(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const updateContentInBackend = await axios.put(
        process.env.REACT_APP_API_ENDPOINT! + url,
        { content: data.get("Content") },
        userAuthorizationFunction()!
      );
      if (updateContentInBackend) {
        setEditingInfo(false);
      }
    } catch (error) {}
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack direction="column" spacing={0.25}>
        <TextField
          value={contentInfo}
          fullWidth
          margin="normal"
          name="Content"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error !== null}
          helperText={error}
          multiline
        />
        <Button type="submit" variant="outlined">
          Update Post Content
        </Button>
      </Stack>
    </Box>
  );
};
