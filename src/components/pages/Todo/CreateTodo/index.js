import React, { useContext } from 'react';
import useFormValidation from '../../../auth/useFormValidation';
import validateCreateTodo from "../../../auth/validateCreateTodo";
import { FirebaseContext } from "../../../../firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
    title: "",
    description: ""
}

const CreateTodo = (props) => {
    const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateTodo, handleCreateTodo);
    const { firebase, user } = useContext(FirebaseContext);

    // useFormValidation custom hook requires "function functionName()" notation
    function handleCreateTodo() {
        // Prevent access to page if user not logged in
        if (!user) {
            props.history.push("/login")
        } else {
            const { title, description } = values;
            const newTodo = {
                title,
                description: description ? description : "none",
                addedBy: {
                    id: user.uid,
                    name: user.displayName
                },
                created: Date.now(),
                completed: false
            }
            firebase.db.collection("todos").add(newTodo)
            props.history.push("/todo-list");
        }
    }
    return (
        <div className="container">
            <h1>Create New To-do</h1>
            <div className="container section">
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title of todo"
                            onChange={handleChange}
                            value={values.title}
                            style={errors.title && { border: "2px solid red" }}
                        />
                        {errors.title && <p>{errors.title}</p>}
                    </div>
                    <div className="input-field">
                        <input
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Description (optional)"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.description}
                            style={errors.description && { border: "2px solid red" }}
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <button className="btn-large wave-effects wave-light" onClick={handleSubmit} style={{ minWidth: "189px" }}>
                        <span>Create</span>
                        <i className="material-icons right">add</i>
                    </button>
                </form>
            </div>
            <div className="section">
                <Link to="/todo-list">
                    <button className="btn-large">
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CreateTodo;