import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase';
import { withRouter } from "react-router-dom";

const SignedInLinks = (props) => {
    const { firebase } = useContext(FirebaseContext)
    function handleLogout() {
        firebase.logout();
        localStorage.clear();
        props.history.push("/login")
    }
    return (
        <nav>
            <div className="nav-wrapper teal">
                <a href="#" className="brand-logo left hide-on-large-only">LIFESTYLE APP</a>
                <ul id="nav-mobile" className="right">
                    <li onClick={() => handleLogout()}>Log Out</li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(SignedInLinks);