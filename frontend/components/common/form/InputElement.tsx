// import services
import {useState} from 'react'

// import components
import dynamic from "next/dynamic";
import FormControl from "./FormControl";
import EyeBtn from "./EyeBtn";
const ResendBtn = dynamic(() => import('./resend-btn/ResendBtn'), {ssr: false});

// custom types
interface IProps {
  name: "name" | "email" | "phone" | "password" | "verification_code",
  label: string,
  placeholder: string,
  type: "text" | "password" | "email",
  value: string,
  changeHandler: (e: any) => void,
  error_message: string | null,
}

// COMPONENT
const InputElement: React.FC<IProps> = ({
  name,
  label,
  placeholder,
  type,
  value,
  changeHandler,
  error_message,
}) => {

  const [displayPassword, setDisplayPassword] = useState(false);

  let togglePassword: any = () => setDisplayPassword(!displayPassword);

  return (
    <FormControl label={label} error_message={error_message}>
      {/* Relative container - for absolute child elements */}
      <div className="w-full relative">
        
        {/* INPUT ELEMENT */}
        <input
          name={name}
          type={displayPassword ? 'text' : type}
          className={`
            w-full
            border border-[#cbcbcb] focus:border-[#323232]
            px-[10px] py-[8px]
            text-[16px]
            outline-none
            rounded-md
          `}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />

        {/* RESEND BUTTON */}
        { name === 'verification_code' && <ResendBtn /> }
        {(name === 'password' && value) && <EyeBtn toggle={togglePassword} />}
      </div>
    </FormControl>
  );
}

export default InputElement;