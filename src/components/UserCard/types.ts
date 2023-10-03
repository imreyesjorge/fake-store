import { IUserData } from "../../types/users";

export type IUserCardProps = Omit<IUserData, "password">;
