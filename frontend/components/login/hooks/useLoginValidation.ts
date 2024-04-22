// import services
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
// import { Auth } from 'aws-amplify';

// import types
import { AlertType, LoginFormData } from "@/types";

// import utils
import { checkEmail, checkPassword } from "@/utils/functions";
import ROUTES from "@/utils/ROUTES";

// import context
import authContext from "@/context/auth/authContext";
import alertContext from "@/context/alert/alertContext";
import axios from "axios";

// custom types
interface UseLoginValidation {
  data: LoginFormData;
  changeHandler: (e: any) => void;
  submitHandler: (e: any) => void;
}

// HOOK
const useLoginValidation = (): UseLoginValidation => {
  // router
  const router = useRouter();

  // context
  const { set_auth_loading, update_user } = useContext(authContext);
  const { add_alert } = useContext(alertContext);

  // local state
  const [data, setData] = useState<LoginFormData>({
    email: "",
    password: "",
    error: { email: null, password: null },
  });

  // handler to handle input change
  let changeHandler = (e: any) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: {
        ...data.error,
        [e.target.name]: null,
      },
    });

  // handler to handle form submission
  let submitHandler = async (e: any) => {
    e.preventDefault();

    // Validate Email
    const { error: emailError } = checkEmail(data.email);
    // Validate Password
    const { error: passwordError } = checkPassword(data.password);

    // update state
    if (emailError || passwordError)
      return setData({
        ...data,
        error: {
          email: emailError,
          password: passwordError,
        },
      });

    // LOGIN
    try {
      // set loading
      set_auth_loading!(true);

      // perform auth operation
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API_HOST}/login`,
        { email: data.email, password: data.password }
      );
      console.log("LOGIN RESPONSE => ", response);

      // update global state
      update_user!({ email: data.email });

      // show success alert
      add_alert!({
        type: AlertType.SUCCESS,
        message: "User has been logged in.",
      });

      // redirect to next step
      router.push(ROUTES.ROOT);
    } catch (error: any) {
      // show error alert
      add_alert!({ type: AlertType.ERROR, message: error.message });
      console.log("LOGIN ERROR => ", error.message);
    }
  };

  return {
    data,
    changeHandler,
    submitHandler,
  };
};

export default useLoginValidation;
