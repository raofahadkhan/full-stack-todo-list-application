// import services
import Link from "next/link";

// custom types
interface IProps {
  children: React.ReactNode,
  href: string,
}

// COMPONENT
const SolidLinkBtn: React.FC<IProps> = ({
  children,
  href,
}) => {
  return (
    <Link href={href}
      className="
      px-[10px] py-[2px]
      bg-gradient-to-b
      from-green-400 to-green-700
      text-white
      rounded-[7px]
      justify-self-center
      cursor-pointer
      active:scale-95
      "
    >
      {children}
    </Link>
  );
}

export default SolidLinkBtn;