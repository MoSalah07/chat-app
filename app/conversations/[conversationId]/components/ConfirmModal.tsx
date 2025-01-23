"use client";
import React from "react";
import useConversation from "@/app/hooks/useConversation";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { handleErrorsClient } from "@/app/libs/handleErrors";
import Modal from "@/app/components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { DialogTitle } from "@headlessui/react";
import Button from "@/app/components/Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/conversations/${conversationId}`, {
        conversationId,
      });
      onClose();
      router.push(`/conversations`);
      router.refresh();
    } catch (err: any) {
      toast.error(handleErrorsClient(err));
      console.log(err);
      return err;
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex items-center flex-shrink-0 size-12 rounded-full bg-red-100 sm:size-10 sm:mx-0">
          <FiAlertTriangle className="size-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className={`text-base font-semibold leading-6 text-gray-900`}
          >
            Delete conversation
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure want to delete this conversation? This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
