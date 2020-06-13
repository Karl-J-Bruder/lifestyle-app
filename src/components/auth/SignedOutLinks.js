import React from 'react';
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <nav>
            <div className="nav-wrapper teal">
                <Link href="/" className="brand-logo left">LIFESTYLE APP</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signup" style={{ fontSize: "1.25rem" }}>Sign Up</Link></li>
                    <li><Link to="/login" style={{ fontSize: "1.25rem" }}>Log In</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default SignedOutLinks;