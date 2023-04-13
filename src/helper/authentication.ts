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

const login = async (loginInfo: loginCredentials) => {
  const loginResponse = await axios.post(
    process.env.REACT_APP_API_ENDPOINT! + "api/login",
    loginInfo
  );
  return loginResponse.data;
};

const signup = async (signupInfo: signupCredentials) => {
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
