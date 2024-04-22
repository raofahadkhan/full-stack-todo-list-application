// import services
import Link from "next/link";

// import components
import PageWrapper from "@/components/common/containers/PageWrapper";
import Heading1 from "@/components/common/typography/Heading1";

// import utils
import ROUTES from "@/utils/ROUTES";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={true} user={null}>
      {/* TEMPORARY UPDATE BOX */}
      <div className="w-[320px] max-w-full flex flex-col items-center justify-center gap-5 bg-gray-100 p-10">
        <Heading1>Done Screens:</Heading1>
        <ul className="w-full flex flex-col items-center justify-center list-none gap-y-2 gap-x-2">

          {/* LOGIN */}
          <h1 className="font-bold text-red-400">LOGIN</h1>
          <li>
            <Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.LOGIN}>Login</Link>
          </li>

          {/* SIGNUP */}
          <h1 className="font-bold text-red-400 mt-4">SIGNUP</h1>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.SIGNUP}>Signup</Link>
          </li>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.SIGNUP_CONFIRMATION}>Signup Confirmation</Link>
          </li>

          {/* EMAIL VERIFICATION */}
          <h1 className="font-bold text-red-400 mt-4">EMAIL VERIFICATION</h1>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.SEND_CODE}>Send Code</Link>
          </li>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.EMAIL_VERIFICATION}>Email Verification</Link>
          </li>

          {/* RESET PASSWORD */}
          <h1 className="font-bold text-red-400 mt-4">RESET PASSWORD</h1>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.RESET_CODE}>Reset Code</Link>
          </li>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.RESET_PASSWORD}>Reset Password</Link>
          </li>

          {/* APP */}
          <h1 className="font-bold text-red-400 mt-4">APP</h1>
          <li><Link className="bg-gray-200 w-full p-1 cursor-pointer rounded-md hover:text-green-600" target="_blank"
            href={ROUTES.PROFILE}>Profile</Link>
          </li>

        </ul>
      </div>
    </PageWrapper>
  );
}

export default page;