import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import { FirebaseContext } from '../../../../firebase';
import moment from "moment";
import { buttonStyles, buttonContentStyles } from "../../../../styles/theme";
import M from 'materialize-css';


const ShoppingItemDetails = () => {

    const [itemDetails, setItemDetails] = useState({})
    const [isComplete, setIsComplete] = useState(false);
    const { history, match } = useReactRouter();
    const { firebase } = useContext(FirebaseContext);

    // Get data from Firebase
    useEffect(() => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${match.params.id}`);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                const docData = doc.data()
                setItemDetails(docData)
            }
        })

    }, []);

    // Initialize modal (Materialize)
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    });

    const handeDeleteItem = () => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${match.params.id}`);
        docRef.delete();
        history.push("/shopping-list")
    }

    const handleCompleteItem = () => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${match.params.id}`);
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
        <div className="container">
            <h1>Shopping List Item Details</h1>
            <div className="divider"></div>
            <div className="section">
                <p className="flow-text">Item name: {itemDetails.title}</p>
            </div>
            <div className="divider"></div>
            <div>
                {itemDetails.description && <div> <p className="flow-text">Description: {itemDetails.description}</p></div>}
                <div className="divider"></div>
                <div className="section">
                    <p className="flow-text">Created on: {moment(itemDetails.created).format("dddd, MMMM Do, YYYY")}</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <p className="flow-text">Complete? {itemDetails.completed ? "YES" : "NO"}</p>
                </div>
                <div className="divider"></div>
            </div>
            <div className="section">
                {itemDetails.completed ?
                    <button className="btn-floating btn-large yellow accent-4" style={buttonStyles} onClick={() => handleCompleteItem()}>
                        <i className="material-icons black-text" style={buttonContentStyles}>undo</i>
                    </button> :
                    <button className="btn-floating btn-large green darken-4" style={buttonStyles} onClick={() => handleCompleteItem()}>
                        <i className="material-icons" style={buttonContentStyles}>done</i>
                    </button>
                }
                <a href={`/edit-shopping-list-item/${match.params.id}`}>
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
                    <h4>Deleting "{itemDetails.title}"</h4>
                    <p className="flow-text">Are you sure?</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close btn-flat green" onClick={() => handeDeleteItem()} style={buttonStyles}>Yes</a>
                    <a href="#!" className="modal-close btn-flat red" style={buttonStyles}>No</a>
                </div>
            </div>
            {/* Modal End*/}
            <div className="section">
                <Link to="/shopping-list">
                    <button className="btn-large">
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingItemDetails;