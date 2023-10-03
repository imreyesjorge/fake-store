"use client";

import { Button, Spinner } from "@nextui-org/react";
import { useFetcher } from "../../hooks/useFetcher";
import { UserCard } from "../../components/UserCard";
import { IUserData } from "../../types/users";
import { useEffect, useState } from "react";

export default function UsersScreen() {
  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [sortedData, setSortedData] = useState<IUserData[]>([]);
  const [sortingOrder, setSortingOrder] = useState<any>(undefined);

  const { data: users, isLoading: usersLoading } = useFetcher<IUserData[]>({
    url: "https://fakestoreapi.com/users",
  });

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  useEffect(() => {
    if (!usersData) return;

    const sorted = usersData.sort((a, b) => {
      if (!sortingOrder) return;

      if (sortingOrder.column === "email") {
        const order = sortingOrder.order === "asc" ? 1 : -1;

        if (a.email < b.email) {
          return -1 * order;
        }
        if (a.email > b.email) {
          return 1 * order;
        }
        return 0;
      }

      if (sortingOrder.order === "asc") {
        return b[sortingOrder.column] - a[sortingOrder.column];
      } else {
        return a[sortingOrder.column] - b[sortingOrder.column];
      }
    });
    setSortedData(sorted);
  }, [usersData, sortingOrder]);

  return (
    <div className="w-full flex items-center justify-center">
      {usersLoading && <Spinner />}
      {usersData && (
        <div className="my-[80px]">
          <div className="mb-[40px]">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-slate-600">You’re now seeing all the users</p>
          </div>
          <div className="mb-[20px] flex justify-between">
            <div className="flex gap-[5px]">
              <Button
                color={
                  sortingOrder && sortingOrder.column === "id"
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  if (!sortingOrder || sortingOrder.id === "email") {
                    setSortingOrder({ column: "id", order: "asc" });
                    return;
                  }

                  setSortingOrder((prev) => {
                    if (prev.order === "asc") {
                      return { column: "id", order: "dsc" };
                    }
                    return { column: "id", order: "asc" };
                  });
                }}
              >
                ID
              </Button>
              <Button
                color={
                  sortingOrder && sortingOrder.column === "email"
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  if (!sortingOrder || sortingOrder.id === "id") {
                    setSortingOrder({ column: "email", order: "asc" });
                    return;
                  }

                  setSortingOrder((prev) => {
                    if (prev.order === "asc") {
                      return { column: "email", order: "dsc" };
                    }
                    return { column: "email", order: "asc" };
                  });
                }}
              >
                Email
              </Button>
            </div>
            <Button
              onClick={() => {
                setUsersData(users);
                setSortingOrder(undefined);
              }}
            >
              Reset
            </Button>
          </div>
          <div className="flex gap-[20px] flex-wrap justify-center">
            {sortedData.map((userData) => (
              <UserCard
                key={userData.id}
                {...userData}
                onDelete={() => {
                  setUsersData((prev) => {
                    const updatedArr = [...prev];
                    const userIndex = updatedArr.findIndex(
                      (item) => item.id === userData.id
                    );
                    updatedArr.splice(userIndex, 1);

                    return updatedArr;
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
