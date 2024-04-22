"use client"

// import services
import Link from "next/link";

// import components
import Heading1 from "@/components/common/typography/Heading1";
import SignupForm from "@/components/signup/SignupForm";
import PageWrapper from "@/components/common/containers/PageWrapper";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      {/* Heading */}
      <Heading1>Join Livecart</Heading1>
      {/* Form */}
      <SignupForm />
      {/* Link */}
      <div className="flex gap-1 text-sm">
        <p>Have an account already?</p>
        <Link 
          className="font-bold text-green-500 hover:text-green-600" 
          href={'/login'}
        >
          Log in
          
        </Link>
      </div>
    </PageWrapper>
  );
}

export default page;