"use client";
import React from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

export default function UsersList({ items }: UserListProps) {
  return (
    <aside className="fixed inse-y-0 pb-20 lg:pb-0 left-0 lg:left-20 w-full lg:w-80 block lg:block overflow-y-auto border-r border-gray-200">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}
