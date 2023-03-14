import axios from "axios";

type loginCredentials = {
  username: string;
  password: string;
};

type signupCredentials = {
  username: string;
  name: string;
  password: string;
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
    process.env.REACT_APP_API_ENDPOINT! + "api/signup",
    signupInfo
  );
  return signupResponse.data;
};

export { login, signup };
