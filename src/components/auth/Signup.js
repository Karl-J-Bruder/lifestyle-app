import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import uuid from "uuid/v4";

const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    city: ""
}

const Signup = (props) => {
    const { handleChange, handleSubmit, handleBlur, errors, values, isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
    //State for Firebase auth errors
    const [firebaseError, setFirebaseError] = useState(null);

    async function authenticateUser() {
        try {
            const { username, email, password, city } = values;
            const id = uuid();
            await firebase.register(username, email, password, city, id);
            const newUser = {
                username,
                id,
                email,
                password,
                city,
                registeredOn: Date.now()
            }
            firebase.db.collection("users").add(newUser);
            props.history.push("/login")
        } catch (error) {
            console.error("Authentication Error: Signup ", error)
            setFirebaseError(error.message)
        }
    }

    return (
        <div className="section center-align" style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ fontSize: "3rem", marginTop: "1rem" }}>Sign Up Page</h1>
            <form onSubmit={handleSubmit} className="section center-align" style={{ width: "95%", marginRight: "0" }}>
                <div className="input-field">
                    <i className="material-icons prefix">face</i>
                    <input
                        type="text" id="username" name="username"
                        value={values.username}
                        onChange={handleChange}
                        style={errors.username && { border: "2px solid red" }}
                    />
                    <label htmlFor="username">Username (Required)</label>
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
                    <label htmlFor="email">Email (Required)</label>
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
                    <label htmlFor="password">Password (Required)</label>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix">location_city</i>
                    <input
                        type="text" id="city" name="city"
                        onBlur={handleBlur}
                        value={values.city}
                        onChange={handleChange}
                        style={errors.city && { border: "2px solid red" }}
                    />
                    <label htmlFor="city">Your city (Required)</label>
                </div>
                <div>
                    {errors.username && <p>{errors.username}</p>}
                    {errors.email && <p>{errors.email}</p>}
                    {errors.password && <p>{errors.password}</p>}
                    {errors.city && <p>{errors.city}</p>}
                    {firebaseError && <p>{firebaseError}</p>}
                </div>
                <div className="section center-align">
                    {window.screen.width < 450 ?
                        <div className="section center-align">
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                disabled={isSubmitting}
                                style={{ width: "75vw", height: "15vw" }}
                            >
                                <span>Sign Up</span>
                                <i className="material-icons right">person_add</i>
                            </button>
                        </div>
                        :
                        <div className="section center-align">
                            <button
                                className="btn btn-large waves-effect waves-light"
                                type="submit"
                                name="action"
                                disabled={isSubmitting}
                                style={{ width: "40%", height: "8vw", margin: "20px 5px" }}
                            >
                                <span>Sign Up</span>
                                <i className="material-icons right">person_add</i>
                            </button>
                        </div>
                    }
                </div>
            </form>
            {window.screen.width < 450 ?
                <div className="section center-align">
                    <Link to="/login">
                        <button
                            className="btn btn-large waves-effect waves-light green darken-3"
                            disabled={isSubmitting}
                            style={{ width: "75%", height: "20%", margin: "20px 5px" }}
                        >Already have an account?</button>
                    </Link>
                </div>
                :
                <div className="section center-align">
                    <Link to="/login">
                        <button
                            className="btn btn-large waves-effect waves-light green darken-3"
                            disabled={isSubmitting}
                            style={{ width: "60%", height: "20%", margin: "20px 5px" }}
                        >Already have an account?</button>
                    </Link>
                </div>
            }
        </div>
    )
}


export default Signup;
