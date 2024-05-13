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
      <div>HOme page</div>
    </PageWrapper>
  );
};

export default page;
