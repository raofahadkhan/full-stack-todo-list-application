// import types
import { ReturnTypeValidationFunction } from "@/types";

// import utils
import { checkEmpty } from "../functions";

/**
 * @desc utility function to validate name string
 * @return `true` if valid & `false` if invalid
 */
const checkName = (name: string) : ReturnTypeValidationFunction => {
  // remove extra spaces
  name = name.trim();

  // check empty
  if(checkEmpty(name)) return { error: 'Please enter your name.' };

  // check length
  if(name.length <= 3) return { error: 'Name should contain atleast 3 characters.' };

  // check special characters
  if(name.match(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g)) return { error: 'Special characters are not allowed.' };

  // check numbers
  if(!name.match(/^[^0-9]+$/)) return { error: 'Numbers are not allowed.' };

  // return success
  return { error: null };
};

export default checkName;