"use client"

// import services
import Link from "next/link";

// import components
import Heading1 from "@/components/common/typography/Heading1";
import LoginForm from "@/components/login/LoginForm";
import PageWrapper from "@/components/common/containers/PageWrapper";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      {/* Heading */}
      <Heading1>Sign in to Todo List App</Heading1>
      {/* Form */}
      <LoginForm />
      {/* Link */}
      <div className="flex gap-1 text-sm">
        <p>New to Livecart?</p>
        <Link
          className="font-bold text-green-500 hover:text-green-600" 
          href={'/signup'}
        >
          Create account
          
        </Link>
      </div>
    </PageWrapper>
  );
}

export default page;