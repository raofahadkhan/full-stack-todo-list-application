"use client"

// import components
import PageWrapper from "@/components/common/containers/PageWrapper";
import Heading1 from "@/components/common/typography/Heading1";
import VerifyEmailForm from "@/components/verify-email/VerifyEmailForm";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      {/* Heading */}
      <Heading1>Signup Confirmation</Heading1>
      {/* Instructions */}
      <div className="flex flex-col text-center">
        <p>We sent a 6-character code to</p>
        <p className="text-green-500 font-medium">example@gmail.com</p>
        <p>Please enter the code for signup confirmation</p>
      </div>
      {/* Form */}
      <VerifyEmailForm purpose="SIGNUP_VERIFICATION" />
    </PageWrapper>
  );
}

export default page;