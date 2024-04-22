// import components
import { EmailVerificationPurpose } from "@/types";
import Form from "../common/form/Form";
import InputElement from "../common/form/InputElement";

// import hooks
import useEmailVerification from "./hooks/useEmailVerification";

interface IProps {
  purpose: EmailVerificationPurpose,
}

// COMPONENT
const VerifyEmailForm:React.FC<IProps> = ({ purpose }) => {
  const { data, changeHandler, submitHandler } = useEmailVerification(purpose);

  return (
    <Form submit_btn_value="Verify" submitHandler={submitHandler}>
      {/* verification_code */}
      <InputElement
        name="verification_code"
        label="Verification Code"
        type="text"
        placeholder="Enter Your Verification Code"
        value={data.verification_code}
        changeHandler={changeHandler}
        error_message= {data.error.verification_code}
      />
    </Form>
  );
}

export default VerifyEmailForm;