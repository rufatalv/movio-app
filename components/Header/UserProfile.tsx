'use client';
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

export const UserProfile = (props: Props) => {
  // const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="flex -order-1 md:order-1 relative border-slate-400/50">
      <div
        onClick={toggleOpen}
        className="px-4 py-2 hover:shadow-md transition-all duration-300 cursor-pointer border border-slate-400/50 rounded-xl md:rounded-full">
        {/* Hello, {session?.user?.name?.split(" ")[0] || "user"}! */}
        Hello, user!
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            bg-white 
            w-full
            overflow-hidden border border-slate-400/50 
            top-12 
          ">
          <div className="flex flex-col cursor-pointer">
            {/* {session ? (
              <>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
              </>
            ) : (
            )} */}
            <>
              <MenuItem onClick={() => signIn()}>Log in</MenuItem>
              <MenuItem onClick={() => router.push("/register")}>
                Register
              </MenuItem>
            </>
          </div>
        </div>
      )}
    </div>
  );
};
