import useNav from "@/hooks/useNav";
import { SafeUser } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserProfile } from "./UserProfile";
import { NavbarProps } from "./Header";

export default function Navlinks({ currentUser }: NavbarProps) {
  const { isOpen, setIsOpen } = useNav();

  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 6,
      scale: 0.8,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -6,
      scale: 0.8,
    },
  };
  return (
    <>
      <div
        className={`cursor-pointer md:hidden relative z-10`}
        onClick={() => setIsOpen(!isOpen)}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          animate={variant}
          viewBox="0 0 28 28"
          className={`invert duration-500 transition-all`}
          fill="none">
          <motion.path
            variants={top}
            d="M2 8H26"
            stroke="white"
            strokeWidth="2"
          />
          <motion.path
            variants={center}
            d="M2 14H26"
            stroke="white"
            strokeWidth="2"
          />
          <motion.path
            variants={bottom}
            d="M2 20H26"
            stroke="white"
            strokeWidth="2"
          />
        </motion.svg>
      </div>
      <div
        className={`fixed w-3/5 sm:w-2/5  top-0 ${
          isOpen ? "right-0" : "-right-full"
        } md:static flex py-20 px-8 transition-all duration-300 md:p-0 md:backdrop-blur-0 md:h-auto md:border-0 border-l h-full justify-end md:justify-normal backdrop-blur-[5px] md:w-full md:items-center gap-5 md:gap-0 flex-col-reverse md:flex-row `}>
        <ul className=" md:mx-auto flex flex-col md:flex-row  gap-5">
          <li className="text-xl font-medium lowercase">
            <Link href={"#"}>Home</Link>
          </li>
          <li className="text-xl font-medium lowercase">
            <Link href={"#"}>Watch</Link>
          </li>
          <li className="text-xl font-medium lowercase">
            <Link href={"#"}>Top 100</Link>
          </li>
        </ul>
        <UserProfile currentUser={currentUser} />
      </div>
    </>
  );
}
