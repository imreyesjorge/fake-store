"use client";

import { Spinner } from "@nextui-org/react";
import { useFetcher } from "../../hooks/useFetcher";
import { useEffect } from "react";

export default function UsersScreen() {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetcher({ url: "https://fakestoreapi.com/users" });

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div>
      {usersLoading && <Spinner />}
      {users && <p>Data fetched</p>}
    </div>
  );
}
