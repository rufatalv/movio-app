"use client";
import { SafeUser } from "@/types/types";
import Logo from "./Logo";
import Navlinks from "./Navlinks";

export interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="fixed top-0 left-0 z-50 backdrop-blur-[5px] bg-afw w-full border-b border-slate-400/50">
      <nav className="container px-6 lg:px-0 relative z-10 items-center flex  gap-5 justify-between py-5 ">
        <Logo />
        <Navlinks currentUser={currentUser} />
      </nav>
    </header>
  );
};

export default Header;
