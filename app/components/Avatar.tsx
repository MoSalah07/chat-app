"use client";
import React from "react";
// Prisma Schema
import { User } from "@prisma/client";
// Image
import PlaceholderUser from "@/public/placeholder-user.png";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user: User;
}

export default function Avatar({ user }: AvatarProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden size-9 md:size-11">
        <Image alt="Avatar" src={user?.image || PlaceholderUser} fill />
      </div>
      {isActive && (
        <span className="absolute top-0 right-0 block rounded-full bg-green-500 ring-2 ring-white size-2 md:size-3"></span>
      )}
    </div>
  );
}
