// import components
import InputElement from "../common/form/InputElement";
import PhoneInputElement from "../common/form/PhoneInputElement";

// import hooks
import useSignupValidation from "./hooks/useSignupValidation";
import Form from "../common/form/Form";

// COMPONENT
const SignupForm = () => {
  const { data, changeHandler, phoneHandler, submitHandler } = useSignupValidation();
  
  return (
    <Form submit_btn_value="Create Account" submitHandler={submitHandler}>
      {/* name */}
      <InputElement
        name="name"
        label="Full Name"
        type="text"
        placeholder="Enter Your Full Name"
        value={data.name}
        changeHandler={changeHandler}
        error_message= {data.error.name}
      />

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

      {/* phone */}
      <PhoneInputElement
        label="Phone"
        value={data.phone}
        phoneHandler={phoneHandler}
        error_message= {data.error.phone}
      />

      {/* password */}
      <InputElement
        name="password"
        label="Password"
        type="password"
        placeholder="Enter Your Password"
        value={data.password}
        changeHandler={changeHandler}
        error_message= {data.error.password}
      />
    </Form>
  );
}

export default SignupForm;