// custom interface
interface IProps {
  label: string,
  error_message: string | null,
  children: React.ReactNode,
}

// COMPONENT
const FormControl:React.FC<IProps> = ({
  label,
  error_message,
  children,
}) => {
  return (
    <div className="w-full flex flex-col relative">
      {/* Label */}
      <label className="text-sm font-light text-[#000000]">{label}</label>
      {/* Children */}
      { children }
      {/* Error */}
      { error_message && <span className="text-xs text-red-400 absolute bottom-[-15px]">{error_message}</span> }
    </div>
  );
}

export default FormControl;