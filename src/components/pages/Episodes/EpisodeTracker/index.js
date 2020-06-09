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
        <div>
            <h3>Episode Tracker Page</h3>
            <div className="section conatiner">
                <a href="/add-series">
                    <button className="btn-large z-depth-3 white blue blue-text">
                        <span>Add a new series</span>
                        <i className="material-icons right">add</i>
                    </button>
                </a>
            </div>
            <div className="section conatiner">
                <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Sort by</a>
                {/* <!-- Dropdown Structure --> */}
                <ul id='dropdown1' className='dropdown-content'>
                    <li><a href="#!"><i className="material-icons">play_circle_outline</i>Anime</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><a href="#!"><i className="material-icons">image</i>Manga</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><a href="#!"><i className="material-icons">tv</i>TV</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><a href="#!"><i className="material-icons">book</i>Book</a></li>
                </ul>
            </div>
            <EpisodeTable />
            <div className="section"></div>
        </div>
    )
}

export default EpisodeTrackerPage;