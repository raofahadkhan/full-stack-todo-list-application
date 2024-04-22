"use client"

// import components
import Heading1 from "@/components/common/typography/Heading1";
import SendCodeForm from "@/components/send-code/SendCodeForm";
import PageWrapper from "@/components/common/containers/PageWrapper";

// PAGE
const page = () => {
  return (
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      {/* Heading */}
      <Heading1>Forgot Password?</Heading1>
      {/* Instructions */}
      <div className="flex flex-col text-center">
        <p>To reset password, please enter your Email</p>
        <p>You will receive a verification code</p>
      </div>
      {/* Form */}
      <SendCodeForm purpose="RESET_PASSWORD" />
    </PageWrapper>
  );
}

export default page;