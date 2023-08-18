"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const variant = isNavOpen ? "opened" : "closed";
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
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-400/50">
      <nav className="container relative items-center flex  gap-5 justify-between py-5 ">
        <h1 className="text-4xl font-medium">
          <Link href={"/"}>movio.</Link>
        </h1>
        <div
          className={`cursor-pointer md:hidden relative z-10`}
          onClick={() => setIsNavOpen(!isNavOpen)}>
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
          className={`fixed top-0 ${
            isNavOpen ? "right-0" : "-right-full"
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

          <div className="flex gap-5">
            <Link
              href={"/login"}
              className={buttonVariants({
                variant: "default",
                className: "!text-md py-5 px-6",
              })}>
              Login
            </Link>
            <Link
              href={"/signup"}
              className={buttonVariants({
                variant: "default",
                className: "!text-md py-5 px-6",
              })}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
