import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };
    const handlePhoneSubmit = (event) => {
        event.preventDefault();
        const regex = /[^0-9]/g;
        if(phoneNumber.length < 10 || regex.test(phoneNumber)){
            alert("Invalid Phone Number");
            return
        }
        setShowOtp(true);
    };

    const onOtpSubmit = (otp) => {
        console.log(otp);
    };
    return (
        <div>
            {!showOtp ? (
                 <form onSubmit={handlePhoneSubmit}>
                 <input 
                     type="text"
                     value={phoneNumber}
                     onChange={handlePhoneNumber}
                     placeholder="Enter Phone Number"
                 />
                 <button type="submit">Submit</button>
             </form>
            ) : (
                <div>
                    Enter OTP sent to {phoneNumber}
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    )
};
export default PhoneLogin;