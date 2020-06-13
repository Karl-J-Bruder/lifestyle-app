import React, { useEffect } from 'react';
import EpisodeTable from "../EpisodeTable";
import M from 'materialize-css';

const EpisodeTrackerPage = () => {

    // Initialise "Select medium" menu (Materialize function)
    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 })
    }, []);

    return (
        <div className="section center-align">
            <h3>Episode Tracker Page</h3>
            <div className="section conatiner">
                <a href="/add-series">
                    <button className="btn-large z-depth-3 white blue blue-text">
                        <span>Add a new series</span>
                        <i className="material-icons right">add</i>
                    </button>
                </a>
            </div>
            <EpisodeTable />
            <div className="section"></div>
        </div>
    )
}

export default EpisodeTrackerPage;