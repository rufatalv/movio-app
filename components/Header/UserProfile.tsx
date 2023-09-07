"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useSession } from "next-auth/react";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div
      ref={ref}
      className="flex -order-1 md:order-1 relative border-slate-400/50">
      <div
        onClick={toggleOpen}
        className="px-4 py-2 w-full md:w-fit flex gap-2 items-center hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-400/50 rounded-xl md:rounded-full">
        <>
          <Image
            width={24}
            height={24}
            className="rounded-full"
            alt="avatar"
            src={"/placeholder.jpg"}
          />
          <hr className="w-[1px] opacity-40 h-full bg-slate-400 text-black" />
        </>
        Hello, Guest!
      </div>
      {isOpen && (
        <div
          className={`
              absolute 
              rounded-xl 
              bg-white 
              w-full
              overflow-hidden border border-slate-400/50 
              top-12
          `}>
          <div className="flex flex-col cursor-pointer">
            {/* {currentUser ? (
              <>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </>
            ) : (
                )} */}
            <>
              <MenuItem onClick={() => router.push("/login")}>Log in</MenuItem>
              <MenuItem>Register</MenuItem>
            </>
          </div>
        </div>
      )}
    </div>
  );
};
