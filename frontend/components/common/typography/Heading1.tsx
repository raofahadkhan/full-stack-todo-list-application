// custom type
interface IProps {
  children: React.ReactNode,
  align?: 'center' | 'left',
};

// COMPONENT
const Heading1:React.FC<IProps> = ({
  children,
  align = 'center',
}) => {
  return (
    <h1 className={`
      w-full
      text-3xl
      ${align === 'center' && 'text-center'}
      ${align === 'left' && 'text-left'}
      font-semibold
    `}>
      {children}
    </h1>
  );
}

export default Heading1;