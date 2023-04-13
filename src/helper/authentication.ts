import axios from "axios";

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

export { login, signup, isLoggedIn };
