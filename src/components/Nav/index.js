import React from 'react';
import { Link } from "react-router-dom";



function Nav() {

    return (
        <div className="container">
            <div className="row">
                <Link to="/todo-list">
                    <button className="btn-large" style={{ width: "80vw" }}>
                        <i className="material-icons left">format_list_numbered</i>
                        <span className="flow-text">To-Do List</span>
                        <i className="material-icons right">format_list_numbered</i>
                    </button>
                </Link>
            </div>
            <div className="row">
                <Link to="/shopping-list">
                    <button className="btn-large" style={{ width: "80vw" }}>
                        <i className="material-icons left">shopping_cart</i>
                        <span className="flow-text">Shopping List</span>
                        <i className="material-icons right">shopping_cart</i>
                    </button>
                </Link>
            </div>
            <div className="row">
                <Link to="/weather">
                    <button className="btn-large" style={{ width: "80vw" }}>
                        <i className="material-icons left">wb_sunny</i>
                        <span className="flow-text">Weather</span>
                        <i className="material-icons right">wb_sunny</i>
                    </button>
                </Link>
            </div>
            <div className="row">
                <Link to="/episode-tracker">
                    <button className="btn-large" style={{ width: "80vw" }}>
                        <i className="material-icons left">ondemand_video</i>
                        <span className="flow-text">Episode Tracker</span>
                        <i className="material-icons right">ondemand_video</i>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Nav