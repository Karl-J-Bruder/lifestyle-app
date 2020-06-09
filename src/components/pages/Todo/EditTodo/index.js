import React, { useState, useEffect, useContext } from 'react';
import useReactRouter from "use-react-router";
import moment from "moment";
import { FirebaseContext } from '../../../../firebase';
import M from 'materialize-css';
import { buttonStyles } from "../../../../styles/theme";

const EditTodo = () => {
    const [todoDetails, setToDoDetails] = useState({})
    const { history, match } = useReactRouter();
    const { firebase } = useContext(FirebaseContext);

    // Get data from Firebase
    useEffect(() => {
        const docRef = firebase.db.collection("todos").doc(`${match.params.id}`);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                const docData = doc.data()
                setToDoDetails(docData)
            }
        })
    }, [])

    // Initialize modal (Materialize)
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    });

    const handeDeleteTodo = () => {
        const docRef = firebase.db.collection("todos").doc(`${match.params.id}`);
        docRef.delete();
        history.push("/todo-list")
    }

    const handeEditTodo = () => {
        const docRef = firebase.db.collection("todos").doc(`${match.params.id}`);
        docRef.set({ ...todoDetails, "title": todoDetails.title, "description": todoDetails.description });
        history.push("/todo-list")
    }

    const handleChange = (event) => {
        //event will be undefined unless we persist data
        event.persist();
        //Return an object by adding a set of () 
        setToDoDetails(previousValues => ({
            ...previousValues,
            // dynamically updates the event property for the form being filled in
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container">
            <div className="divider"></div>
            <div className="section">
                <p className="flow-text">Title: {todoDetails.title}</p>
            </div>
            <div className="divider"></div>
            <div>
                {todoDetails.description && <div> <p className="flow-text">Description: {todoDetails.description}</p></div>}
                <div className="divider"></div>
                <div className="section">
                    <p className="flow-text">Created on: {moment(todoDetails.created).format("dddd, MMMM Do, YYYY")}</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <p className="flow-text">Complete? {todoDetails.completed ? "YES" : "NO"}</p>
                </div>
                <div className="divider"></div>
            </div>
            <div>
                <p className="flow-text">Edit this item:</p>
                <form onSubmit={handeEditTodo}>
                    <p className="left">Title of Todo</p>
                    <div className="input-field">
                        <input
                            type="text" id="title" name="title"
                            value={todoDetails.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <p className="left">Description</p>
                        <input
                            type="text" id="description" name="description"
                            value={todoDetails.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn-large" onClick={handeEditTodo} style={{ minWidth: "257px" }}>
                        <span>Save Changes</span>
                        <i className="material-icons right">save</i>
                    </button>
                </form>
            </div>
            <div className="section">
                <button className="btn-large red accent-4 modal-trigger" data-target="confirmDeleteModal" style={{ minWidth: "257px" }}>
                    <span>Delete</span>
                    <i className="material-icons right">delete</i>
                </button>
                {/* Modal */}
                <div className="modal" id="confirmDeleteModal">
                    <div className="modal-content green-text">
                        <h4>Deleting "{todoDetails.title}"</h4>
                        <p className="flow-text">Are you sure?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat green" onClick={() => handeDeleteTodo()} style={buttonStyles}>Yes</a>
                        <a href="#!" className="modal-close btn-flat red" style={buttonStyles}>No</a>
                    </div>
                </div>
                {/* Modal End*/}
            </div>
            <div className="section">
                <a href={`/todo-item-details/${match.params.id}`}>
                    <button className="btn-large"
                        style={{ minWidth: "257px", margin: "0 20px" }}
                    >
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to Item Details</span>
                    </button>
                </a>
                <div className="section"></div>
                <a href="/todo-list">
                    <button className="btn-large" style={{ minWidth: "257px" }}>
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default EditTodo;