"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Form from "./Form";
import { Conversation, Message, User } from "@prisma/client";
import { FullMessageType } from "@/app/types";

interface WaraperClientSideProps {
  conversation: Conversation & {
    users: User[];
  };
  messages: FullMessageType[];
}

export default function WaraperClientSide({
  conversation,
  messages,
}: WaraperClientSideProps) {
  const [isClientLoaded, setIsClientLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  return (
    <>
      {isClientLoaded && (
        <>
          <Header conversation={conversation} />
          <Body initialMessage={messages} />
          <Form />
        </>
      )}
    </>
  );
}
