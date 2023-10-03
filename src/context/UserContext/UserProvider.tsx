import { useState } from "react";
import { UserContext } from "./UserContext";
import { IUser, IUserProviderProps } from "./types";

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
