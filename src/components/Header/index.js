import React, { useContext } from 'react';
import { Links } from "../../styles/theme";
import { withRouter, Link } from "react-router-dom";
import SignedInLinks from "../auth/SignedInLinks";
import SignedOutLinks from "../auth/SignedOutLinks";
import { FirebaseContext } from '../../firebase';

const Header = () => {
    // Styles for React Router Links
    const Linkstyles = {
        color: Links.plainWhite
    }
    const { user } = useContext(FirebaseContext)

    return (
        <div>
            {user ? (<SignedInLinks />) : (<SignedOutLinks />)}
        </div>
    )
}

export default withRouter(Header);