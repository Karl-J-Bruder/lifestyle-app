import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { useState } from "react";


// Initial form state
// imported handleChange function adds properties dynamically,
// which throws a warning in the console
const INITIAL_STATE = {
    username: "",
    email: "",
    password: ""
}

const Login = (props) => {
    const { handleChange, handleSubmit, handleBlur, errors, values, isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
    //State for Firebase auth errors
    const [firebaseError, setFirebaseError] = useState(null)

    // Respond to invalid user credentials
    async function authenticateUser() {
        try {
            const { email, password } = values;
            await firebase.login(email, password);
            props.history.push("/")
        } catch (error) {
            console.error("Authentication Error: Login ", error)
            setFirebaseError(error.message)
        }
    }
    return (
        <div className="container">
            <h1>Log In Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <i className="material-icons prefix">face</i>
                    <input
                        type="text" id="userName" name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="userName">Username</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix">email</i>
                    <input
                        type="email" id="email" name="email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        style={errors.email && { border: "2px solid red" }}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix">lock_outline</i>
                    <input
                        type="password" id="password" name="password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        style={errors.password && { border: "2px solid red" }}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div>

                    {errors.password && <p>{errors.password}</p>}
                    {firebaseError && <p>{firebaseError}</p>}
                </div>
                <div className="section">
                    <button
                        className="btn btn-large waves-effect waves-light"
                        type="submit"
                        name="action"
                        disabled={isSubmitting}
                        style={{ minWidth: "325px" }}
                    >
                        <span>Log In</span>
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
            <div className="section">
                <Link to="/signup">
                    <button className="btn btn-large waves-effect waves-light yellow darken-3">
                        <span>Need to create an account?</span>
                        <i className="material-icons right">person_add</i>
                    </button>
                </Link>
            </div>
            <div className="section">
                <Link to="/forgot-password">
                    <button className="btn btn-large waves-effect waves-light red darken-3" style={{ minWidth: "325px" }}>
                        <span>Forgot Password?</span>
                        <i className="material-icons right">help_outline</i>
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default Login;
