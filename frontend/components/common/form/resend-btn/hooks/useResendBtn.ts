// import services
import { useEffect, useState } from "react";

// custom types
interface UseResendBtn {
  timer: number,
  resendCode: (e: any) => void,
}

// HOOK
const useResendBtn = () : UseResendBtn => {
  // state
  const [timer, setTimer] = useState(59);
  const [isActive, setIsActive] = useState(true);

  // update timer
  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    if (isActive && timer > 0){
        intervalID = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    };
    // clear timeout
    return () => clearInterval(intervalID)
  } , [isActive , timer])

  // click handler for resend button
  const resendCode = (e: any) => {
    e.preventDefault();
    setTimer(59);
    setIsActive(true);
    /** add resend operation here */
  };

  return {
    timer,
    resendCode,
  }
}

export default useResendBtn;