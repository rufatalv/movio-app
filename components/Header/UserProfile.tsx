"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div ref={ref} className="flex -order-1 md:order-1 relative border-slate-400/50">
      <div
        onClick={toggleOpen}
        className="px-4 py-2 flex gap-2 items-center hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-400/50 rounded-xl md:rounded-full">
        {currentUser && (
          <>
            <img
              width={24}
              height={24}
              className="rounded-full"
              alt="avatar"
              src={
                currentUser.image !== null
                  ? currentUser.image
                  : "/placeholder.jpg"
              }
            />
            <hr className="w-[1px] opacity-40 h-full bg-slate-400 text-black" />
          </>
        )}
        Hello, {currentUser?.name?.split(" ")[0] || "user"}!
      </div>
      {isOpen && (
        <div
          className={`
            absolute 
            rounded-xl 
            bg-afw 
            w-full
            overflow-hidden border border-slate-400/50 
            top-12
        `}>
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Link href={"/user/profile"}>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => signIn()}>Log in</MenuItem>
                <Link href={"/auth/register"}>
                  <MenuItem>Register</MenuItem>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
