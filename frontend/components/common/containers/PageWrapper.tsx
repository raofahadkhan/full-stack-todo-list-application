// import components
import Navbar from "../navbar/Navbar";

// import types
import { User } from "@/types";

// custom types
interface IProps {
  children: React.ReactNode,
  show_auth_links: boolean,
  user: User | null,
  gap?: 4 | null,
};

// COMPONENT
const PageWrapper:React.FC<IProps> = ({
  children,
  show_auth_links,
  user,
  gap = null,
}) => {
  return (
    <>
    {/* Navbar */}
    <Navbar show_auth_links={show_auth_links} />

    {/* Main Page Container */}
    <main 
      className={
       `w-[500px] max-w-full mx-auto
        flex flex-col items-center justify-center
        ${gap === 4 && 'gap-4'} py-5 px-5`}
    >
      {children}
    </main>
    </>
  );
};

export default PageWrapper;