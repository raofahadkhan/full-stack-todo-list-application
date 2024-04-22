// import components
import InputElement from "../common/form/InputElement";

// import hooks
import useLoginValidation from "./hooks/useLoginValidation";
import Form from "../common/form/Form";
import TroubleSigningIn from "./TroubleSigningIn";

// COMPONENT
const LoginForm = () => {
  const { data, changeHandler, submitHandler } = useLoginValidation();
  
  return (
    <Form submit_btn_value="Sign In" submitHandler={submitHandler}>
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

      {/* password */}
      <InputElement
        name="password"
        label="Password"
        type="password"
        placeholder="Enter Your Password"
        value={data.password}
        changeHandler={changeHandler}
        error_message={data.error.password}
      />
      
      <TroubleSigningIn/>
    </Form>
  );
}

export default LoginForm;