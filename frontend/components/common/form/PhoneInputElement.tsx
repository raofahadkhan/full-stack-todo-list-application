// import services
import { useState } from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// import types
import { phoneHandler } from '@/types';

// import components
import FormControl from './FormControl';

// custom types
interface IProps {
  label: string,
  value: string,
  phoneHandler: phoneHandler,
  error_message: string | null,
}

// COMPONENT
const PhoneInputElement: React.FC<IProps> = ({
  label,
  value,
  phoneHandler,
  error_message,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <FormControl label={label} error_message={error_message}>
      <PhoneInput
        inputStyle={{
          border: `1px solid ${focus ? '#323232' : '#cbcbcb'}`,
          width: '100%',
          fontSize: "16px",
          padding: '8px 10px',
          paddingLeft: '48px'
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        country={'us'}
        value={value}
        onChange={(value, data: CountryData) => {
          const total_valid_phone_length = countDots(data.format);          
          phoneHandler(value, value.length === 15 || value.length === total_valid_phone_length);
        }}
      />
    </FormControl>
  );
};

function countDots(inputString: string): number {
  // Use the match method with a regular expression to find all dots in the string
  const dots = inputString.match(/\./g);
  // If dots are found, return the count; otherwise, return 0
  return dots ? dots.length : 0;
}

export default PhoneInputElement;