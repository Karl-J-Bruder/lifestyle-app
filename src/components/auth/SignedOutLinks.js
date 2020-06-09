import React from 'react';
import { Link } from "react-router-dom";
import M from "materialize-css";

const SignedOutLinks = () => {
    return (
        <nav>
            <div className="nav-wrapper teal">
                <a href="#" className="brand-logo left hide-on-large-only">LIFESTYLE APP</a>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default SignedOutLinks;