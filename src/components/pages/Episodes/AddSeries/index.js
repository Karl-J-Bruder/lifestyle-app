import React, { useContext } from 'react';
import useFormValidation from '../../../auth/useFormValidation';
import validateAddSeries from "../../../auth/validateAddSeries";
import { FirebaseContext } from "../../../../firebase";
import { Link } from "react-router-dom";
import M from 'materialize-css';

// Used by useFormValidation custom hook
const INITIAL_STATE = {
    title: "",
    medium: ""
}

const AddSeries = (props) => {
    const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateAddSeries, handleAddSeries);
    const { firebase, user } = useContext(FirebaseContext);

    // Initialise "Select medium" menu (Materialize function)
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    });


    // useFormValidation custom hook requires "function functionName()" notation
    function handleAddSeries() {
        // Prevent access to page if user not logged in
        if (!user) {
            props.history.push("/login")
        } else {
            const { title, medium } = values;
            const newSeries = {
                title,
                medium,
                addedBy: {
                    id: user.uid,
                    name: user.displayName
                },
                progress: 1,
                created: Date.now(),
                finished: false
            }
            firebase.db.collection("series").add(newSeries)
            props.history.push("/episode-tracker");
        }
    }
    return (
        <div className="section center-align">
            <h1>Add a new series</h1>
            <div className="container section">
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title of series"
                            onChange={handleChange}
                            value={values.title}
                            style={errors.title && { border: "2px solid red" }}
                        />
                        {errors.title && <p>{errors.title}</p>}
                    </div>
                    <div className="input-field" style={{ color: "white" }}>
                        <select id="medium" name="medium" value={values.medium} onChange={handleChange}>
                            <option value="" disabled selected>Select Medium</option>
                            <option value="Anime">Anime</option>
                            <option value="Manga">Manga</option>
                            <option value="TV">TV</option>
                            <option value="Book">Book</option>
                        </select>
                        {errors.medium && <p>{errors.medium}</p>}
                    </div>

                    <div className="section"></div>
                    <div className="section"></div>
                    <button className="btn-large wave-effects wave-light offset-s1" onClick={handleSubmit}>
                        <span>Submit</span>
                        <i className="material-icons right">add</i>
                    </button>
                </form>
            </div>
            <div className="section">
                <Link to="/episode-tracker">
                    <button className="btn-large">
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AddSeries;