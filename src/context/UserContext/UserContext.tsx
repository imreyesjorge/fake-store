import { createContext, useContext } from "react";
import { IUserContext } from "./types";

export const UserContext = createContext<IUserContext>(null);

export const useUserContext = () => {
  return useContext(UserContext);
};
