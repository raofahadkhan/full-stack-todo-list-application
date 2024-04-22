"use client"

// import services
import { useContext } from 'react';
import Link from "next/link";
import Image from "next/image";

// import icons
import { HiMiniBars3 } from "react-icons/hi2";

// import utils
import ROUTES from "@/utils/ROUTES";

// import components
import AuthLinks from "./AuthLinks";

// import context
import authContext from '@/context/auth/authContext';

// custom interface
interface IProps {
  show_auth_links: boolean,
}

// COMPONENT
const Navbar: React.FC<IProps> = ({
  show_auth_links,
}) => {
  // context
  const { user } = useContext(authContext);

  return (
    <nav className="
      w-full h-[64px]
      flex items-center justify-between gap-4
      py-[10px] px-[20px]
      border border-b-[#dadada]
    ">

      {/* NAV-ICON AND LOGO CONTAINER */}
      <div className="w-fit h-full flex items-center justify-center gap-1">
        {/* Hamburger */}
        <HiMiniBars3 className={`w-[25px] h-auto cursor-pointer active:scale-95 mr-[10px]`} />

        {/* Logo */}
        <Link className="w-fit h-full flex items-center justify-center" href={ROUTES.ROOT}>
          <Image
            src="/images/livecart-logo.svg"
            width={170}
            height={49}
            alt="Livecart icon logo"
            className="w-auto h-[80%] cursor-pointer"
          />
        </Link>
      </div>

      {
        user ? (
          // USER ICON
          <Image
            src="/images/account-logo.svg"
            width={50}
            height={49}
            alt="Livecart icon logo"
            className="w-auto h-[70%] cursor-pointer active:scale-95"
          />
        ) : (
          // AUTH LINKS
          show_auth_links && <AuthLinks />
        )
      }
      
    </nav>
  );
}

export default Navbar;