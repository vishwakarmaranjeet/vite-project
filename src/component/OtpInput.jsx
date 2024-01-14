import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRef = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = otp.join("");
        if(combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Moved to next input if current field is filled
        if(value && index < length - 1 && inputRef.current[index + 1]){
            inputRef.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRef.current[index].setSelectionRange(1, 1);
    
        // optional
        if (index > 0 && !otp[index - 1]) {
          inputRef.current[otp.indexOf("")].focus();
        }
      };
    
      const handleKeyDown = (index, e) => {
        if (
          e.key === "Backspace" &&
          !otp[index] &&
          index > 0 &&
          inputRef.current[index - 1]
        ) {
          // Move focus to the previous input field on backspace
          inputRef.current[index - 1].focus();
        }
      };

    return (
        <div>
            {otp.map((value, index) => {
                return (
                    <input 
                        key={index}
                        type="text"
                        ref={(input)=> (inputRef.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                )
            })}
        </div>
    )

};
export default OtpInput;