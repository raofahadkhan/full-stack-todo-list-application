// import services
import React, { useState} from 'react';

// import chakra elements
import { Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

// COMPONENT
const AlertItem = ({alert , onClose}: any) => {

  // state
  const [isVisible, setIsVisible] = useState(true);

  // Close Alert on clicking close icon
  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {
        isVisible && (
          <Alert status={alert.type}>
            <AlertIcon />
            <Box>
              <AlertTitle>{alert.type}!</AlertTitle>
              <AlertDescription>
                {alert.message}
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf='flex-start'
              position='absolute'
              right='5px'
              top='5px'
              onClick={handleClose}
            />
          </Alert>
        ) 
      }
    </>
  )
}

export default AlertItem;