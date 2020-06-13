import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase';
import { withRouter, Link } from "react-router-dom";

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
                <Link href="/" className="brand-logo left" style={{ paddingLeft: "10px" }}>LIFESTYLE APP</Link>
                <ul id="nav-mobile" className="right">
                    <li style={{ fontSize: "1.25rem", paddingRight: "15px" }} onClick={() => handleLogout()}>Log Out</li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(SignedInLinks);