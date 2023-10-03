"use client";

import { Spinner } from "@nextui-org/react";
import { useFetcher } from "../../hooks/useFetcher";
import { UserCard } from "../../components/UserCard";
import { IUserData } from "../../types/users";

export default function UsersScreen() {
  const { data: users, isLoading: usersLoading } = useFetcher<IUserData[]>({
    url: "https://fakestoreapi.com/users",
  });

  return (
    <div>
      {usersLoading && <Spinner />}
      {users && (
        <div className="my-[80px]">
          <div className="mb-[40px]">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-slate-600">You’re now seeing all the users</p>
          </div>
          <div className="flex gap-[20px] flex-wrap justify-center">
            {users.map((userData) => (
              <UserCard key={userData.id} {...userData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
