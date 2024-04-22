// import routes
import ROUTES from "@/utils/ROUTES";

// import NEXT.js elements
import Link from "next/link";

// import components
import SolidLinkBtn from "../link-buttons/SolidLinkBtn";

// COMPONENT
const AuthLinks = () => {
  return (
    <div className="flex items-center justify-center gap-2">

      {/* LOGIN Link Button */}
      <Link 
        href={ROUTES.LOGIN} 
        className="text-green-500 hover:text-green-700 font-medium"
      >
        Login
      </Link>

      {/* SIGNUP Link Button */}
      <SolidLinkBtn href={ROUTES.SIGNUP}>
        Signup
      </SolidLinkBtn>
      
    </div>
  );
}

export default AuthLinks;