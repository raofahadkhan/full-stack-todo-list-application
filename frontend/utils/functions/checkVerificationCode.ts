// import types
import { ReturnTypeValidationFunction } from "@/types";

// import utils
import { checkEmpty } from "../functions";

/**
 * @desc utility function to validate name string
 * @return `true` if valid & `false` if invalid
 */
const checkVerificationCode = (code: string) : ReturnTypeValidationFunction => {
  // remove extra spaces
  code = code.trim();

  // check empty
  if(checkEmpty(code)) return { error: 'Please enter your code.' };

  // return success
  return { error: null };
};

export default checkVerificationCode;