import { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/system/Stack";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import axios from "axios";

type formDataType = {
  postTitle: FormDataEntryValue | null;
  postContent: FormDataEntryValue | null;
};

type authorizationConfigType = {
  headers: {
    Authorization: string;
  };
};

export const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const userAuthorizationToken = localStorage.getItem("user");
  let authorizationConfig: authorizationConfigType | null = null;
  if (userAuthorizationToken) {
    authorizationConfig = {
      headers: {
        Authorization: `bearer ${JSON.parse(userAuthorizationToken).token}`,
      },
    };
  }
  const backendPostCreation = async (formData: formDataType): Promise<void> => {
    try {
      const backendPostCreationRequest = await axios.post(
        process.env.REACT_APP_API_ENDPOINT! + "api/post",
        formData,
        authorizationConfig!
      );
      if (backendPostCreationRequest.status === 201) navigate("/");
    } catch (err: any) {
      setErrorMessage(err.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await backendPostCreation({
      postTitle: data.get("title"),
      postContent: data.get("content"),
    });
  };

  return (
    <Box width="500px" component="form" onSubmit={handleSubmit} noValidate>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ""}
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
