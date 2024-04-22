// import types
import { ReturnTypeValidationFunction } from "@/types";

// import utils
import { checkEmpty } from "../functions";

/**
 * @desc utility function to validate email string
 * @return `true` if valid & `false` if invalid
 */
const checkEmail = (email: string) : ReturnTypeValidationFunction => {
  // remove extra spaces
  email = email.trim();

  // check empty
  if(checkEmpty(email)) return { error: 'Please enter your email.' };
  
  // check email pattern
  if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) 
    return { error: 'Email is invalid.' };

  // return success
  return { error: null };
};

export default checkEmail;