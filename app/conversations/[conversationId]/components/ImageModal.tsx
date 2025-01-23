"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export default function ImageModal({ onClose, isOpen, src }: ImageModalProps) {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="size-[22rem] sm:size-[26rem] md:size-[38rem]">
        <Image alt="Image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
}
