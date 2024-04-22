// import services
import { useState } from "react";

// import icons
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";

// COMPONENT
const EyeBtn = ({toggle}: any) => {

  // state
  let [seeIcon , setSeeIcon] = useState(false);

  // function to toggle icons
  let changeIcon = () => {
    setSeeIcon(seeIcon ? false : true)
    toggle();
  }

  return (
    <div className="
      absolute right-1 top-[50%] -translate-y-[50%]
      flex items-center
      cursor-pointer
      bg-white
      h-[95%]
      px-[8px]
    ">
      <span onClick={changeIcon}>
        {
          seeIcon ? (
            <FaRegEyeSlash className={`text-gray-500`} />
          ) : (
            <FaRegEye className={`text-gray-500`}/>
          )
        }
      </span>
    </div>
  );
}

export default EyeBtn;