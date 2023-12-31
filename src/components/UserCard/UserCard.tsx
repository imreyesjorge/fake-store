import { Button } from "@nextui-org/react";
import { IUserCardProps } from "./types";
import Link from "next/link";

export function UserCard({
  id,
  username,
  name,
  email,
  onDelete,
}: IUserCardProps) {
  return (
    <section className="min-w-[260px] max-w-[260px] p-4 border border-white/25 hover:border-white flex flex-col gap-[10px] rounded-2xl relative transition">
      <p className="text-xs font-bold w-[20px] h-[20px] bg-white text-black flex items-center justify-center rounded-full absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
        {id}
      </p>
      <img
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${username}${id}`}
        alt="user profile picture"
        className="w-full h-[120px] rounded-lg object-cover"
      />
      <div className="font-medium">
        <div>
          <small className="text-slate-600 block">@{username}</small>
          <h2 className="text-lg font-medium">
            {name.firstname.toUpperCase()} {name.lastname.toUpperCase()}
          </h2>
          <address className="text-sm font-light">{email}</address>
        </div>
      </div>
      <Button
        as={Link}
        variant="flat"
        href={`/users/${id}`}
        className="font-medium hover:text-black hover:bg-white"
      >
        See More
      </Button>
      <Button
        variant="bordered"
        onClick={() => {
          onDelete();
        }}
        className="font-medium hover:bg-red-500 hover:border-red-500"
      >
        Delete
      </Button>
    </section>
  );
}
