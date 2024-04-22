"use client";

// import chakra elements
import { Box , Grid , GridItem , Button} from "@chakra-ui/react"

// import components
import PageWrapper from "@/components/common/containers/PageWrapper";
import Heading1 from "@/components/common/typography/Heading1";
import ActionBox from "@/components/profile/ActionBox";

// import Next.js element
import Link from "next/link";
import ProfileForm from "@/components/profile/ProfileForm";

// PAGE
const page = () => {
  return (
    <>
    <PageWrapper show_auth_links={false} user={null} gap={4}>
      <Heading1 align="left">My Profile</Heading1>
      <ProfileForm />
    </PageWrapper>  

    <Box width='500px' maxWidth='100%' marginX='auto' display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding='20px' gap='25px'>

        <Heading1 align="left" >Actions</Heading1>
        <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)' gap='10px' background='#f8f8f8' border='1px solid #dadada' borderRadius='lg' padding='15px' width='100%'>
          <GridItem w='100%'>
            <ActionBox imgSrc='/images/orderHistory.svg' text='Order History'/>
          </GridItem>

          <GridItem w='100%'>
            <ActionBox imgSrc='/images/trackOrder.svg' text='Track Order'/>
          </GridItem>

          <GridItem w='100%'>
            <ActionBox imgSrc='/images/shareWithFriends.svg' text='Share with Friends'/>
          </GridItem>

          <GridItem w='100%'>
            <ActionBox imgSrc='/images/feedback.svg' text='Feedback'/>
          </GridItem>

          <GridItem w='100%'>
            <ActionBox imgSrc='/images/contactUs.svg' text='Contact Us'/>
          </GridItem>

          <GridItem w='100%'>
            <ActionBox imgSrc='/images/subscription.svg' text='Subscription'/>
          </GridItem>
        </Grid>

        <Box 
          width='100%' 
          display='flex' alignItems='center' justifyContent='space-evenly' 
          textDecoration='underline' color='#71778EC2'
        >
          <Link href=''>Term of Use</Link>
          <Link href=''>Term of Service</Link>
          <Link href=''>Privacy Policy</Link>
        </Box>
        <Box 
          width='100%' 
          display='flex' alignItems='center' justifyContent='center' 
          color='#71778EC2' marginTop='-20px'
        >
          <Link href=''>© 2023 Livecart Inc.</Link>
        </Box>

        <Button 
          variant='solid'
          background='#C7C8CD'
          paddingX='100px'
          borderRadius='25px'
          marginBottom='15px'>
          Close
        </Button>
    </Box>

    
    </>
  );
}

export default page;