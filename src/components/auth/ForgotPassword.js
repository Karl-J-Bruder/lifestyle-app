import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";


const ForgotPassword = () => {
    const { firebase } = useContext(FirebaseContext)
    const [passwordResetFormState, setPasswordResetFormState] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState(null);


    const handleChange = (e) => {
        setPasswordResetFormState(e.target.value)
    }
    async function handleResetPassword() {
        try {
            await firebase.resetPassword(passwordResetFormState)
            setIsPasswordReset(true)
            setPasswordResetError(null)
        } catch (error) {
            console.error("Error sending email: ", error.message)
            setPasswordResetError(error.message)
            setIsPasswordReset(false)
        }
    }
    return (
        <div className="section container center-align">
            <h1>Reset Password</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter email" onChange={handleChange} />
            </div>
            <div className="section" />
            <button className="btn btn-large" onClick={handleResetPassword}>Reset Password</button>
            {isPasswordReset && <p>Check your email to reset your password</p>}
            {passwordResetError && <p>{passwordResetError}</p>}
        </div>
    );
}

export default ForgotPassword;