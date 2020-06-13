import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import moment from "moment";
import { FirebaseContext } from '../../../../firebase';
import { buttonStyles, buttonContentStyles } from "../../../../styles/theme";
import M from 'materialize-css';


const TodoItemDetails = () => {
    const [todoDetails, setToDoDetails] = useState({})
    const [isComplete, setIsComplete] = useState(false);
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
    }, []);

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

    const handleCompleteTodo = () => {
        const docRef = firebase.db.collection("todos").doc(`${match.params.id}`);
        docRef.get().then(doc => {
            if (doc.exists) {
                let previousStatus = doc.data().completed;
                let newStatus = !previousStatus;
                docRef.update({ completed: newStatus })
            }
        })
        setIsComplete(!isComplete);
    }
    return (
        <div className="section center-align">
            <h1>Todo Item Details</h1>
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
            <div className="section">
                {todoDetails.completed ?
                    <button className="btn-floating btn-large yellow accent-4" style={buttonStyles} onClick={() => handleCompleteTodo()}>
                        <i className="material-icons black-text" style={buttonContentStyles}>undo</i>
                    </button> :
                    <button className="btn-floating btn-large green darken-4" style={buttonStyles} onClick={() => handleCompleteTodo()}>
                        <i className="material-icons" style={buttonContentStyles}>done</i>
                    </button>
                }
                <a href={`/edit-todo/${match.params.id}`}>
                    <button className="btn-floating btn-large orange darken-4" >
                        <i className="material-icons" style={buttonContentStyles}>edit</i>
                    </button>
                </a>
                <button className="btn-floating btn-large red accent-4 modal-trigger" data-target="confirmDeleteModal" style={buttonStyles}>
                    <i className="material-icons" style={buttonContentStyles}>delete</i>
                </button>
            </div>
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

export default TodoItemDetails;