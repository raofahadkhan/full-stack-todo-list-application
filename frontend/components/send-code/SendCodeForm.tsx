// import components
import InputElement from "../common/form/InputElement";

// import hooks
import useSendCodeValidation from "./hooks/useSendCodeValidation";
import Form from "../common/form/Form";
import { SendCodePurpose } from "@/types";

interface IProps {
  purpose: SendCodePurpose,
}

// COMPONENT
const LoginForm:React.FC<IProps> = ({ purpose }) => {
  const { data, changeHandler, submitHandler } = useSendCodeValidation(purpose);
  
  return (
    <Form submit_btn_value="Send Code" submitHandler={submitHandler}>
      {/* email */}
      <InputElement
        name="email"
        label="Email"
        type="text"
        placeholder="Enter Your Email"
        value={data.email}
        changeHandler={changeHandler}
        error_message= {data.error.email}
      />
    </Form>
  );
}

export default LoginForm;