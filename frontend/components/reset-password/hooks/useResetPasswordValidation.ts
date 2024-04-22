// import services
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify';

// import types
import { AlertType, ResetPasswordFormData } from "@/types";

// import utils
import { checkPassword, checkVerificationCode} from "@/utils/functions";
import ROUTES from '@/utils/ROUTES';

// import context
import authContext from '@/context/auth/authContext';
import alertContext from '@/context/alert/alertContext';

// custom types
interface UseResetPasswordValidation {
  data: ResetPasswordFormData,
  changeHandler: (e : any) => void,
  submitHandler: (e : any) => void,
}

// HOOK
const useResetPasswordValidation = () : UseResetPasswordValidation => {
  // router
  const router = useRouter();

  // context
  const { user, set_auth_loading, update_user } = useContext(authContext);
  const { add_alert } = useContext(alertContext);

  // local state
  const [data, setData] = useState<ResetPasswordFormData>({
    verification_code: '',
    password: '',
    error : { 
      verification_code: null,
      password: null,
    },
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
    const { error: verificationCodeError } = checkVerificationCode(data.verification_code);
    // Validate Password
    const { error : passwordError } = checkPassword(data.password);

    // update state
    if(verificationCodeError || passwordError) return setData({...data, error: {
      verification_code: verificationCodeError,
      password: passwordError,
    }});

    // RESET PASSWORD
    try {
      // set loading
      set_auth_loading!(true);

      // perform auth operation
      // const response = await Auth.forgotPasswordSubmit(user?.email!, data.verification_code, data.password);
      // console.log('RESET PASSWORD RESPONSE => ', response);   

      // update global state
      update_user!({ email: user?.email!});

      // show success alert
      add_alert!({ type: AlertType.SUCCESS, message: 'Your password has been updated.' });

      // redirect to next step
      router.push(ROUTES.LOGIN);

    } catch (error: any) {
      // show error alert
      add_alert!({ type: AlertType.ERROR, message: error.message });
      console.log('RESET PASSWORD ERROR => ', error.message);
    };
  }
  return {
    data,
    changeHandler,
    submitHandler,
  }
}

export default useResetPasswordValidation;