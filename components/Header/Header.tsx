"use client";
import useNav from "@/hooks/useNav";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextAuthProvider } from "@/app/providers";
import { User } from "@prisma/client";

interface IHeaderProps {
  currentUser: User;
}

const Header: React.FC<IHeaderProps> = ({ currentUser }: IHeaderProps) => {
  const { isOpen, setIsOpen } = useNav();
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-400/50">
      <nav className="container relative z-10 items-center flex  gap-5 justify-between py-5 ">
        <Logo />
        <NextAuthProvider>
          <Navlinks />
        </NextAuthProvider>
      </nav>
    </header>
  );
};

export default Header;
