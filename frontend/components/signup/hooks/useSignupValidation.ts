// import services
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
// import { Auth } from 'aws-amplify';

// import types
import { AlertType, SignupFormData, phoneHandler } from '@/types';

// import utils
import { checkName, checkEmail, checkPhone, checkPassword } from '@/utils/functions';

// import context
import authContext from '@/context/auth/authContext';
import alertContext from '@/context/alert/alertContext';
import ROUTES from '@/utils/ROUTES';

// custom types
interface UseSignupValidation {
  data: SignupFormData,
  changeHandler: (e : any) => void,
  phoneHandler: phoneHandler,
  submitHandler: (e : any) => void,
}

// HOOK
const useSignupValidation = () : UseSignupValidation => {
  // router
  const router = useRouter();

  // context
  const { set_auth_loading, update_user } = useContext(authContext);
  const { add_alert } = useContext(alertContext);

  // local state
  const [data, setData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    phone_valid: false,
    password: '',
    error : { name: null, email: null, phone: null, password: null },
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

  // handler to handle phone input
  let phoneHandler = (phone: string, phone_valid: boolean) => {
    setData({
    ...data,
    phone,
    phone_valid,
    error: {
      ...data.error, 
      phone: null,
    }
  });
  }

  // handler to handle form submission
  let submitHandler = async (e : any) => {
    e.preventDefault();

    // Validate Name
    const { error : nameError } = checkName(data.name);
    // Validate Email
    const { error : emailError } = checkEmail(data.email);
    // Validate Phone
    const { error : phoneError } = checkPhone(data.phone, data.phone_valid);
    // Validate Password
    const { error : passwordError } = checkPassword(data.password);

    // update state
    if(nameError || emailError || phoneError || passwordError) return setData({...data, error: {
        name: nameError,
        email: emailError,
        phone: phoneError,
        password: passwordError,
      }});

    // SIGNUP
    try {
      // set loading
      set_auth_loading!(true);

      // perform auth operation
      // const response = await Auth.signUp({
      //   username: data.email,
      //   password: data.password,
      //   attributes: {
      //     name: data.name,
      //     phone: data.phone,
      //   }
      // });
      // console.log('SIGNUP RESPONSE => ', response);   

      // update global state
      update_user!({ email: data.email });

      // show success alert
      add_alert!({ type: AlertType.SUCCESS, message: 'User has been signed up.' });

      // redirect to next step
      router.push(ROUTES.SIGNUP_CONFIRMATION);

    } catch (error: any) {
      // show error alert
      add_alert!({ type: AlertType.ERROR, message: error.message });
      console.log('SIGNUP ERROR => ', error.message);
    };
  };

  return {
    data,
    changeHandler,
    phoneHandler,
    submitHandler,
  };
};

export default useSignupValidation;