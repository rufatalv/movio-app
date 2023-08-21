"use client";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Image from "next/image";

type Props = {
  currentUser: User;
};

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="flex -order-1 md:order-1 relative border-slate-400/50">
      <div
        onClick={toggleOpen}
        className="px-4 py-2 flex gap-2 items-center hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-400/50 rounded-xl md:rounded-full">
        {session?.user?.image && (
          <>
            <Image
              width={24}
              height={24}
              className="rounded-full"
              alt="avatar"
              src={session?.user?.image}
            />
            <hr className="w-[1px] opacity-40 h-full bg-slate-400 text-black" />
          </>
        )}
        Hello, {session?.user?.name?.split(" ")[0] || "user"}!
      </div>
      {isOpen && (
        <div
          className={`
              absolute 
              rounded-xl 
              bg-white 
              w-full
              overflow-hidden border border-slate-400/50 
              ${session?.user?.image ? "top-12" : "top-12"}
          `}>
          <div className="flex flex-col cursor-pointer">
            {session ? (
              <>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => signIn()}>Log in</MenuItem>
                <MenuItem onClick={() => router.push("/auth/register")}>
                  Register
                </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
