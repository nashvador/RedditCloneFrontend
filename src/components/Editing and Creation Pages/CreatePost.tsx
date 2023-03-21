import { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/system/Stack";
import axios from "axios";

type formDataType = {
  postTitle: FormDataEntryValue | null;
  postContent: FormDataEntryValue | null;
};

export const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userAuthorizationToken = localStorage.getItem("user");
  let authorizationConfig: object | null = null;
  if (userAuthorizationToken) {
    authorizationConfig = {
      headers: {
        Authorization: `bearer ${JSON.parse(userAuthorizationToken).token}`,
      },
    };
  }
  const backendPostCreation = async (formData: formDataType): Promise<void> => {
    const backendPostCreationRequest = await axios.post(
      process.env.REACT_APP_API_ENDPOINT! + "api/post",
      formData,
      authorizationConfig!
    );
    console.log(backendPostCreationRequest.data);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      backendPostCreation({
        postTitle: data.get("title"),
        postContent: data.get("content"),
      });
    } catch (err) {
      setErrorMessage("sup");
      console.log(errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <Box width="500px" component="form" onSubmit={handleSubmit} noValidate>
      <Card>
        <Stack
          direction="column"
          alignItems="center"
          justifyItems="center"
          spacing={2}
          padding="1rem"
        >
          <TextField
            label="Title"
            id="title"
            name="title"
            fullWidth
          ></TextField>
          <TextField
            label="Post Content"
            id="content"
            name="content"
            fullWidth
          ></TextField>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};
