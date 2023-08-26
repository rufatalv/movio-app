'use client'
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function MenuItem({ children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="
            px-4 py-2
            h-full
            w-full
            hover:bg-neutral-100 
                        transition-all duration-200

            ">
      {children}
    </div>
  );
}
