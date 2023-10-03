import { useState } from "react";
import { UserContext } from "./UserContext";
import { IUser, UserProviderProps } from "./types";

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
