"use client"

// import components
import Heading1 from "@/components/common/typography/Heading1";
import PageWrapper from "@/components/common/containers/PageWrapper";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      {/* Heading */}
      <Heading1>Reset Password</Heading1>
      {/* Instructions */}
      <div className="flex flex-col text-center">
        <p>We sent a 6-character code to</p>
        <p className="text-green-500 font-medium">example@gmail.com</p>
        <p>Please enter the code and new password</p>
      </div>
      {/* Form */}
      <ResetPasswordForm />
    </PageWrapper>
  );
}

export default page;