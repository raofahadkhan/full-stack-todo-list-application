// import component
import FormSubmitBtn from "./FormSubmitBtn";

// custom type
interface IProps {
  children: React.ReactNode,
  submit_btn_value: string,
  submitHandler: (e: any) => void,
};

// COMPONENT
const Form:React.FC<IProps> = ({ children, submit_btn_value, submitHandler }) => {
  return (
    <form
      onSubmit={submitHandler}
      className="
        w-full
        flex flex-col justify-center items-center gap-[15px]
        bg-[#f8f8f8]
        border border-[#dadada]
        py-[20px]
        px-[20px]
        rounded-lg
        relative
      ">
        {/* children */}
        {children}

        {/* SUBMIT Button */}
        <FormSubmitBtn value={submit_btn_value} />
    </form>
  );
}

export default Form;