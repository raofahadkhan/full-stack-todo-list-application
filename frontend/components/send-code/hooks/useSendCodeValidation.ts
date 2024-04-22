// import services
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify';


// import types
import { AlertType, SendCodeFormData, SendCodePurpose } from '@/types';

// import utils
import { checkEmail } from '@/utils/functions';
import ROUTES from '@/utils/ROUTES';

// import context
import authContext from '@/context/auth/authContext';
import alertContext from '@/context/alert/alertContext';

// custom types
interface UseSendCodeValidation {
  data: SendCodeFormData,
  changeHandler: (e : any) => void,
  submitHandler: (e : any) => void,
}

// HOOK
const useSendCodeValidation = (purpose: SendCodePurpose) : UseSendCodeValidation => {
  // router
  const router = useRouter();

  // context
  const { set_auth_loading, update_user } = useContext(authContext);
  const { add_alert } = useContext(alertContext);

  // local state
  const [data, setData] = useState<SendCodeFormData>({
    email: '',
    error : { email: null },
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

    // Validate Email
    const { error } = checkEmail(data.email);

    // update state
    if(error) return setData({...data, error: {
        email: error,
      }});

    // SEND CODE
    try {
      // set loading
      set_auth_loading!(true);

      // perform auth operation
      // let response;
      // if(purpose === 'EMAIL_VERIFICATION') {
      //   response = await Auth.resendSignUp(data.email);
      // } else if (purpose === 'RESET_PASSWORD') {
      //   response = await Auth.forgotPassword(data.email);
      // }
      // console.log('RESEND CODE RESPONSE => ', response);

      // update global state
      update_user!({ email: data.email });

      // show success alert
      add_alert!({ type: AlertType.SUCCESS, message: 'A verification code has been sent to your email.' });

      // redirect to next step
      if(purpose === 'EMAIL_VERIFICATION') {
        router.push(ROUTES.EMAIL_VERIFICATION)
      } else if (purpose === 'RESET_PASSWORD') {
        router.push(ROUTES.RESET_PASSWORD);
      }

    } catch (error: any) {
      // show error alert
      add_alert!({ type: AlertType.ERROR, message: error.message });
      console.log('RESEND CODE ERROR => ', error.message);
    };
  }

  return {
    data,
    changeHandler,
    submitHandler,
  }
}

export default useSendCodeValidation;