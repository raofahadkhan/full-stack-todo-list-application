// custom interface
interface IProps {
  value: string,
}


// COMPONENT
const FormSubmitBtn:React.FC<IProps> = ({ value }) => {
  return (
    <input 
      name="submit"
      type="submit"
      value={value}
      className="
        mt-5
        w-full
        px-[40px] py-[8px]
        bg-gradient-to-b
        from-green-400 to-green-700
        text-white
        rounded-[7px]
        justify-self-center
        cursor-pointer
        active:scale-95
      "
    />
  );
}

export default FormSubmitBtn;