// import types
import { ReturnTypeValidationFunction } from "@/types";

// import utils
import { checkEmpty } from "../functions";

/**
 * @desc utility function to validate password string
 * @return `true` if valid & `false` if invalid
 */
const checkPassword = (password: string) : ReturnTypeValidationFunction => {
  // remove extra spaces
  password = password.trim();

  // check empty
  if(checkEmpty(password)) return { error: 'Please enter your password.' };

  // return success
  return { error: null };
};

export default checkPassword;