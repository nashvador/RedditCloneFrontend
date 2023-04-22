import axios from "axios";
import io, { Socket } from "socket.io-client";

type loginCredentials = {
  username: string;
  password: string;
};

type signupCredentials = {
  username: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export type user = {
  token: string;
  username: string;
  name: string;
  admin: boolean;
  disabled: boolean;
};

type authorizationConfigType = {
  headers: {
    Authorization: string;
  };
};

const login = async (loginInfo: loginCredentials): Promise<user> => {
  const loginResponse = await axios.post(
    process.env.REACT_APP_API_ENDPOINT! + "api/login",
    loginInfo
  );
  console.log(loginResponse.data);
  return loginResponse.data;
};

const signup = async (signupInfo: signupCredentials): Promise<user> => {
  const signupResponse = await axios.post(
    process.env.REACT_APP_API_ENDPOINT! + "api/users",
    signupInfo
  );
  return signupResponse.data;
};

const isLoggedIn = (): string | null => {
  return localStorage.getItem("user");
};

const returnParsedToken = (): user | null => {
  if (isLoggedIn()) {
    return JSON.parse(isLoggedIn()!);
  } else return null;
};

const userAuthorizationFunction = (): authorizationConfigType | null => {
  const userAuthorizationToken = isLoggedIn();
  let authorizationConfig: authorizationConfigType | null = null;
  if (userAuthorizationToken) {
    authorizationConfig = {
      headers: {
        Authorization: `bearer ${JSON.parse(userAuthorizationToken).token}`,
      },
    };
  }
  return authorizationConfig;
};

const connectSocketToBackend = (): Socket | null => {
  const userAuthorizationToken = isLoggedIn();
  let socket: Socket | null = null;
  if (userAuthorizationToken) {
    socket = io(process.env.REACT_APP_API_ENDPOINT!, {
      auth: {
        token: JSON.parse(userAuthorizationToken).token,
      },
    });
  }
  socket?.on("connection", () => {
    console.log("Connected to server");
  });

  socket?.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  return socket;
};

export {
  login,
  signup,
  isLoggedIn,
  userAuthorizationFunction,
  returnParsedToken,
  connectSocketToBackend,
};
