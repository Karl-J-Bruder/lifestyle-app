import React, { useContext, useEffect } from "react";
import { FirebaseContext } from '../../../../firebase';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { buttonStyles, buttonContentStyles } from "../../../../styles/theme";

const SeriesItem = ({ seriesItem, index }) => {
    const { firebase } = useContext(FirebaseContext);

    // Handler for incrementing/decrmenting current episode/chapter of a series
    const handleUpdateProgress = (value) => {
        const docRef = firebase.db.collection("series").doc(`${seriesItem.id}`);
        docRef.get().then(doc => {
            if (doc.exists) {
                let previousProgress = doc.data().progress;
                if (value === "increment") {
                    let newProgress = previousProgress + 1;
                    docRef.update({ progress: newProgress })

                } else if (value === "decrement") {
                    let newProgress = previousProgress - 1;
                    docRef.update({ progress: newProgress })
                }
            }
        })
    }

    const handeDeleteSeries = () => {
        const docRef = firebase.db.collection("series").doc(`${seriesItem.id}`);
        docRef.delete();
    }

    return (
        <tr key={index}>
            <td>{index}.</td>
            <td>{seriesItem.title}</td>
            <td>{seriesItem.medium}</td>
            <td>Ep. / Ch. {seriesItem.progress}</td>
            <td style={{ padding: "0" }}>
                <button className="btn-floating green darken-3" style={{ marginRight: "10px" }} onClick={() => handleUpdateProgress("increment")}>
                    <i className="material-icons">exposure_plus_1</i>
                </button>
                <button className="btn-floating red darken-4" onClick={() => handleUpdateProgress("decrement")}>
                    <i className="material-icons">exposure_neg_1</i>
                </button>
            </td>
            <td>
                <a href={`/edit-series-details/${seriesItem.id}`}>
                    <button className="btn-floating orange darken-4" style={buttonStyles}>
                        <i className="material-icons" style={buttonContentStyles}>edit</i>
                    </button>
                </a>
                <button
                    onClick={() => handeDeleteSeries()}
                    className="btn-floating red accent-4" style={buttonStyles}>
                    <i className="material-icons" style={buttonContentStyles}>delete</i>
                </button>
            </td>
        </tr>
    )
}

export default SeriesItem;