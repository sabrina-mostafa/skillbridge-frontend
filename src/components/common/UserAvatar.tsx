"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";


type UserAvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

export default function UserAvatar({
  name,
  image,
  className,
}: UserAvatarProps) {
  
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (image) {
    return (
      <div className={cn("relative h-9 w-9", className)}>
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover border"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-9 w-9 rounded-full border flex items-center justify-center",
        "bg-gradient-to-br from-indigo-500 to-violet-600",
        "dark:text-white font-semibold text-sm",
        className
      )}
    >
      {initials}
    </div>
  );
}