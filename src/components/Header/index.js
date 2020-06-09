import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import SignedInLinks from "../auth/SignedInLinks";
import SignedOutLinks from "../auth/SignedOutLinks";
import { FirebaseContext } from '../../firebase';

const Header = () => {
    const { user } = useContext(FirebaseContext)

    return (
        <div>
            {user ? (<SignedInLinks />) : (<SignedOutLinks />)}
        </div>
    )
}

export default withRouter(Header);