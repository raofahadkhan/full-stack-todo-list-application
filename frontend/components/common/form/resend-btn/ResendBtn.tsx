// import hooks
import useResendBtn from "./hooks/useResendBtn";

// COMPONENT
const ResendBtn = () => {
  const { timer, resendCode } = useResendBtn();
  
  return (
    <div className="absolute right-[10px] top-[50%] -translate-y-[50%]">
      {(timer === 0) ? (
          // BUTTON
          <button
            className="
            text-green-600 hover:text-green-800
              cursor-pointer
              active:scale-95
              font-[500]"
            onClick={resendCode}>
              Resend
          </button>
        ) : (
          // TIMER
          <span className="font-[500] text-green-600">
            {timer}
          </span>
        )
      }
    </div>
  );
}

export default ResendBtn;