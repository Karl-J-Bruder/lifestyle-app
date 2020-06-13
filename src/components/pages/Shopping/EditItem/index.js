import React, { useState, useEffect, useContext } from 'react';
import useReactRouter from "use-react-router";
import moment from "moment";
import { FirebaseContext } from '../../../../firebase';
import { buttonStyles } from "../../../../styles/theme";
import M from 'materialize-css';

const EditShoppingItem = () => {
    const [itemDetails, setItemDetails] = useState({})
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

    }, [])

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

    const handeEditItem = () => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${match.params.id}`);
        docRef.set({ ...itemDetails, "title": itemDetails.title, "description": itemDetails.description });
        history.push("/shopping-list")
    }

    const handleChange = (event) => {
        //event will be undefined unless we persist data
        event.persist();
        //Return an object by adding a set of () 
        setItemDetails(previousValues => ({
            ...previousValues,
            // dynamically updates the event property for the form being filled in
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="section center-align" style={{ padding: "0 1rem 0 1rem" }}>
            <div className="divider"></div>
            <div className="section">
                <p className="flow-text">Title: {itemDetails.title}</p>
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
            <div className="section center-align">
                <p className="flow-text">Edit this item:</p>
                <form onSubmit={handeEditItem} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <div className="input-field">
                        <p className="left">Item Name</p>
                        <input
                            type="text" id="title" name="title"
                            value={itemDetails.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <p className="left">Description</p>
                        <input
                            type="text" id="description" name="description"
                            value={itemDetails.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn-large" onClick={handeEditItem} style={{ minWidth: "257px" }}>
                        <span>Save Changes</span>
                        <i className="material-icons right">save</i>
                    </button>
                </form>
            </div>
            <div className="section center-align">
                <button className="btn-large red accent-4 modal-trigger" data-target="confirmDeleteModal" style={{ minWidth: "257px" }}>
                    <span>Delete</span>
                    <i className="material-icons right">delete</i>
                </button>
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
            </div>
            <div className="section">
                <a href={`/shopping-list-item-details/${match.params.id}`}>
                    <button className="btn-large"
                        style={{ minWidth: "257px", margin: "0 20px" }}
                    >
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to Item Details</span>
                    </button>

                </a>
            </div>
            <div className="section">
                <a href="/shopping-list">
                    <button className="btn-large" style={{ minWidth: "257px" }}>
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </a>
            </div>
            <div className="section"></div>
        </div>

    )
}

export default EditShoppingItem;