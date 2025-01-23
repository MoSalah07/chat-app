"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: `button` | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md transition-colors duration-300 px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && `opacity-50 cursor-default`,
        fullWidth && "w-full",
        secondary ? `text-gray-900` : `text-white`,
        danger &&
          `bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600`,
        !secondary &&
          !danger &&
          `bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`
      )}
    >
      {children}
    </button>
  );
}
