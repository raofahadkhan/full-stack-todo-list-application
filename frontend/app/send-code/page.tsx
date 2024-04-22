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
      <Heading1>Please enter your Email</Heading1>
      {/* Instructions */}
      <p>You will receive a verification code</p>
      {/* Form */}
      <SendCodeForm purpose="EMAIL_VERIFICATION" />
    </PageWrapper>
  );
}

export default page;