"use client";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { handleErrorsClient } from "@/app/libs/handleErrors";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UserBoxProps {
  data: User;
}

export default function UserBox({ data }: UserBoxProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const handleClick = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: users } = await axios.post(`/api/conversations`, {
        userId: data.id,
      });

      push(`/conversations/${users.data.id}`);
      return users;
    } catch (err: any) {
      console.log(err);
      console.log(handleErrorsClient(err));
      toast.error(handleErrorsClient(err));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [data, push]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.userName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
