// import types
import { ReturnTypeValidationFunction } from "@/types";

// import utils
import { checkEmpty } from "../functions";

/**
 * @desc utility function to validate phone string
 * @return `true` if valid & `false` if invalid
 */
const checkPhone = (phone: string, phone_valid: boolean) : ReturnTypeValidationFunction => {
  // remove extra spaces
  phone = phone.trim();

  // check empty
  if(checkEmpty(phone)) return { error: 'Please enter your phone.' };

  // check length without dial code, should be equal to 10
  if(!phone_valid) return { error: 'Enter valid phone number.'}

  // return success
  return { error: null };
};

export default checkPhone;