import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export default function DesktopItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className={clsx(
          `group flex gap-x-3 
            rounded-md p-3 text-sm 
            leading-6 font-semibold 
          text-gray-500 hover:text-black hover:bg-gray-100 
            transition-colors duration-300`
        )}
      >
        <Icon className={`size-6 shrink-0`} />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
