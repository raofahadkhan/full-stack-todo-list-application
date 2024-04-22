// import components
import Form from "../common/form/Form";
import InputElement from "../common/form/InputElement";

// import hooks
import useResetPasswordValidation from "./hooks/useResetPasswordValidation";

// COMPONENT
const ResetPasswordForm = () => {
  const { data, changeHandler, submitHandler } = useResetPasswordValidation();

  return (
    <Form submit_btn_value="Reset" submitHandler={submitHandler}>
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
      {/* password */}
      <InputElement
        name="password"
        label="New Password"
        type="password"
        placeholder="Enter Your New Password"
        value={data.password}
        changeHandler={changeHandler}
        error_message= {data.error.password}
      />
    </Form>
  );
}

export default ResetPasswordForm;