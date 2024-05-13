"use client";

// import services
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

// import icons
import { HiMiniBars3 } from "react-icons/hi2";

// import utils
import ROUTES from "@/utils/ROUTES";

// import components
import AuthLinks from "./AuthLinks";

// import context
import authContext from "@/context/auth/authContext";

// custom interface
interface IProps {
  show_auth_links: boolean;
}

// COMPONENT
const Navbar: React.FC<IProps> = ({ show_auth_links }) => {
  // context
  const { user } = useContext(authContext);

  return (
    <nav
      className="
      w-full h-[64px]
      flex items-center justify-between gap-4
      py-[10px] px-[20px]
      border border-b-[#dadada]
    "
    >
      {/* <h3>Welcome to {user?.email}</h3> */}
    </nav>
  );
};

export default Navbar;
