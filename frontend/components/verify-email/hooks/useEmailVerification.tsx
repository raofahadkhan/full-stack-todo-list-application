// import services
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify';

// import types
import { AlertType, EmailVerificationFormData, EmailVerificationPurpose } from "@/types";
import { checkVerificationCode } from "@/utils/functions";

// import utils
import ROUTES from '@/utils/ROUTES';

// import context
import authContext from '@/context/auth/authContext';
import alertContext from '@/context/alert/alertContext';

// custom types
interface UseEmailVerification {
  data: EmailVerificationFormData,
  changeHandler: (e : any) => void,
  submitHandler: (e : any) => void,
}

// HOOK
const useEmailVerification = (purpose: EmailVerificationPurpose) : UseEmailVerification => {
  // router
  const router = useRouter();

  // context
  const { user, set_auth_loading, update_user } = useContext(authContext);
  const { add_alert } = useContext(alertContext);

  // local state
  const [data, setData] = useState<EmailVerificationFormData>({
    verification_code: '',
    error : { verification_code: null },
  });

  // handler to handle input change
  let changeHandler = (e : any) => setData({
    ...data,
    [e.target.name]: e.target.value,
    error: {
      ...data.error, 
      [e.target.name]: null
    }
  });

  // handler to handle form submission
  let submitHandler = async (e : any) => {
    e.preventDefault();

    // Validate Code
    const { error } = checkVerificationCode(data.verification_code);

    // update state
    if(error) return setData({...data, error: {
      verification_code: error,
    }});

    // VERIFY EMAIL
    try {
      // set loading
      set_auth_loading!(true);

      // perform auth operation
      // const response = await Auth.confirmSignUp(user?.email!, data.verification_code);
      // console.log('VERIFY EMAIL RESPONSE => ', response);

      // update global state
      update_user!({ email: user?.email!});

      // show success alert
      add_alert!({ type: AlertType.SUCCESS, message: 'Your email has been verified.' });

      // redirect to next step
      if(purpose === 'SIGNUP_VERIFICATION') {
        router.push(ROUTES.PROFILE);
      } else if (purpose === 'EMAIL_VERIFICATION') {
        router.push(ROUTES.LOGIN);
      }

    } catch (error: any) {
      // show error alert
      add_alert!({ type: AlertType.ERROR, message: error.message });
      console.log('VERIFY EMAIL ERROR => ', error.message);
    };
  }
  return {
    data,
    changeHandler,
    submitHandler,
  }
}

export default useEmailVerification;