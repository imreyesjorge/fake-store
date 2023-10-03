import { ReactNode } from "react";

export interface IUserContext {
  user: IUser;
  setUser: Function;
}

export interface IUser {
  token: string;
}

export interface IUserProviderProps {
  children?: ReactNode;
}
