import React, { useState, useEffect, useContext } from 'react';
import useReactRouter from "use-react-router";
import moment from "moment";
import { Link } from "react-router-dom";
import { FirebaseContext } from '../../../../firebase';
import M from 'materialize-css';
import { buttonStyles } from "../../../../styles/theme";

const EditSeriesDetailsPage = () => {
    const [seriesItem, setSeriesItem] = useState({})
    const { history, match } = useReactRouter();
    const { firebase } = useContext(FirebaseContext);

    // Get data from Firebase
    useEffect(() => {
        const docRef = firebase.db.collection("series").doc(`${match.params.id}`);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                const docData = doc.data()
                setSeriesItem(docData)
            }
        })
    }, []);

    // Initialize modal (Materialize)
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    });

    const handeDeleteSeries = () => {
        const docRef = firebase.db.collection("series").doc(`${match.params.id}`);
        docRef.delete();
        history.push("/episode-tracker") // Return to series page after completing action
    }

    const handeEditSeries = () => {
        const docRef = firebase.db.collection("series").doc(`${match.params.id}`);
        docRef.set({ ...seriesItem, "title": seriesItem.title, "medium": seriesItem.medium });
        history.push("/episode-tracker") // Return to series page after completing action
    }

    const handleChange = (event) => {
        //event will be undefined unless we persist data
        event.persist();
        //Return an object by adding a set of () 
        setSeriesItem(previousValues => ({
            ...previousValues,
            // dynamically updates the event property for the form being filled in
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="container">
            <div className="divider"></div>
            <div className="section">
                <p className="flow-text">Title: {seriesItem.title}</p>
            </div>
            <div className="divider"></div>
            <div>
                <p className="flow-text">Medium: {seriesItem.medium}</p>
                <div className="divider"></div>
                <div className="section">
                    <p className="flow-text">Added on: {moment(seriesItem.created).format("dddd, MMMM Do, YYYY")}</p>
                </div>
                <div className="divider"></div>
            </div>
            <div className="container section">
                <p className="flow-text">Edit this item:</p>
                <form onSubmit={handeEditSeries}>
                    <p className="left">Series Title</p>
                    <div className="input-field">
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={seriesItem.title}
                            placeholder="Title of series"
                            onChange={handleChange}
                        />
                    </div>
                    <p className="left">Medium</p>
                    <div className="input-field">
                        <select id="medium" name="medium" onChange={handleChange} style={{ display: "block" }} value={seriesItem.medium}>
                            <option value="" disabled selected>Select Medium</option>
                            <option value="Anime">Anime</option>
                            <option value="Manga">Manga</option>
                            <option value="TV">TV</option>
                            <option value="Book">Book</option>
                        </select>
                    </div>

                    <div className="section"></div>
                    <div className="section"></div>
                    <button className="btn-large wave-effects wave-light offset-s1" onClick={handeEditSeries} style={{ minWidth: "257px", margin: "0 20px" }}>
                        <span>Submit</span>
                        <i className="material-icons right">add</i>
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
                        <h4>Deleting "{seriesItem.title}"</h4>
                        <p className="flow-text">Are you sure?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close btn-flat green" onClick={() => handeDeleteSeries()} style={buttonStyles}>Yes</a>
                        <a href="#!" className="modal-close btn-flat red" style={buttonStyles}>No</a>
                    </div>
                </div>
                {/* Modal End*/}
                <div className="section"></div>
                <div className="section"></div>
                <Link to="/episode-tracker">
                    <button className="btn-large" style={{ minWidth: "257px", margin: "0 20px" }}>
                        <i className="material-icons left">arrow_back</i>
                        <span>Back to List</span>
                    </button>
                </Link>
                <div className="section"></div>
            </div>
        </div>
    )
}

export default EditSeriesDetailsPage;