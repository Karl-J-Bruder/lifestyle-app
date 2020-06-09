import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    city: ""
}

const Signup = (props) => {
    // @@@ Redirect user to homepage if already logged in
    const { handleChange, handleSubmit, handleBlur, errors, values, isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
    //State for Firebase auth errors
    const [firebaseError, setFirebaseError] = useState(null);

    async function authenticateUser() {
        try {
            const { username, email, password, city } = values;
            await firebase.register(username, email, password, city);
            const newUser = {
                username,
                email,
                password,
                city,
                registeredOn: Date.now()
            }
            firebase.db.collection("users").add(newUser);
            props.history.push("/")
        } catch (error) {
            console.error("Authentication Error: Signup ", error)
            setFirebaseError(error.message)
        }
    }

    return (
        <div>
            <h1>Sign Up Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <i className="material-icons prefix">face</i>
                    <input
                        type="text" id="userName" name="username"
                        value={values.username}
                        onChange={handleChange}
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        type="text"
                        onChange={handleChange}
                        style={errors.password && { border: "2px solid red" }}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix">location_city</i>
                    <input
                        type="password" id="password" name="password"
                        onBlur={handleBlur}
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        onChange={handleChange}
                        style={errors.password && { border: "2px solid red" }}
                    />
                    <label htmlFor="password">Your city</label>
                </div>
                <div>

                    {errors.password && <p>{errors.password}</p>}
                    {firebaseError && <p>{firebaseError}</p>}
                </div>
                <div>
                    <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                        disabled={isSubmitting}
                        style={{ width: "60vw", height: "10vw" }}
                    // style={{ background: isSubmitting ? "gray" : "orange" }}
                    >
                        <span>Sign Up</span>
                        <i className="material-icons right">person_add</i>
                    </button>
                </div>
            </form>
            <div>
                <Link to="/login">
                    <button
                        className="btn waves-effect waves-light green darken-3"
                        disabled={isSubmitting}
                        style={{ width: "60vw", height: "10vw", margin: "20px 5px" }}
                    >
                        <span>Already have an account?</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}


export default Signup;
