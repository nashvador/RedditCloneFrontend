import AvatarUser from "../Avatar/AvatarPage";
import { useState, createContext, useContext } from "react";
import { UserContext } from "../../App";

export const UserPage = () => {
  const user = useContext(UserContext);

  return <div>hi</div>;
};
