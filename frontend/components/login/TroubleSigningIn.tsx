// import services
import { useState } from "react";
import Link from 'next/link'

// import icons
import {MdOutlineMarkEmailUnread , MdPublishedWithChanges} from 'react-icons/md'

// import chakra elements
import { Button, Flex} from "@chakra-ui/react";
import ROUTES from "@/utils/ROUTES";

// COMPONENT
const TroubleSigningIn = () => {

  // state
  let [showPopup , setShowPopup] = useState(false);

  let handleBlur = () => {
    setShowPopup(false);
  }

  return (
    <>
      {/* Toggle button to popup floating window, */}
      <Button
        type="button"
        variant='link'
        onBlur={handleBlur} 
        onClick={(e: any) => {
          e.preventDefault();
          setShowPopup(!showPopup);
        }}
        padding='0px'
        alignSelf='end'
        fontSize='sm' fontWeight='bold'
        color='green.500' _hover={{color: 'green.600'}}
        textDecoration='none'
      >
        Trouble Signing In?
      </Button>

      {/* Floating Container */}
      {
        showPopup && 
        <Flex
          direction={'column'}
          position='absolute' 
          bottom='0px' 
          right='18px' 
          border='1px solid #d3d3d3' 
          borderRadius='lg' 
          background='white'
        >
          {/* Link - Email Verification */}
          <Link 
            href={ROUTES.EMAIL_VERIFICATION} 
            className="
              flex items-center gap-[10px]
              px-[40px] py-[10px]
              border-b
              border-b-[#d3d3d3]
              rounded-sm
              hover:text-green-700
              text-md
            "
            passHref
          >
            <MdOutlineMarkEmailUnread />
            Email Verification
          </Link>

          {/* Link - Reset Password */}
          <Link 
            href={ROUTES.RESET_PASSWORD} 
            className="
              flex items-center gap-[10px]
              px-[40px] py-[10px]
              hover:text-green-700
              text-md
            "
            passHref
          >
            <MdPublishedWithChanges />
            Reset Password
          </Link>
        </Flex>
      }
    </>
  );
}

export default TroubleSigningIn;