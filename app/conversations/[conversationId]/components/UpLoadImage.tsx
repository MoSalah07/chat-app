"use client";

import React from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

function UpLoadImage({ conversationId }: { conversationId: string }) {
  const handleUpload = async (result: any) => {
    try {
      const { data } = await axios.post(`/api/messages`, {
        image: result?.info?.secure_url,
        conversationId,
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={handleUpload}
      uploadPreset="gktpzyem"
    >
      <HiPhoto size={30} className="text-sky-500" />
    </CldUploadButton>
  );
}

export default UpLoadImage;
