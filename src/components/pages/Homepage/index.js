import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from "../../../firebase/index";
import { Link } from "react-router-dom";

const Homepage = () => {
    const { firebase, user } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")) ? localStorage.getItem("userProfile") : null)
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        setCurrentUser(info)
        getProfile()
    }, [])
    function getProfile() {
        firebase.db.collection("users").onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const usersList = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        console.log(usersList)
        const loggedInUser = currentUser ? usersList.find(user => user.id === currentUser.uid) : null;
        localStorage.setItem("userProfile", JSON.stringify(loggedInUser));
        setUserProfile(JSON.parse(localStorage.getItem("userProfile")))

    }
    console.log(currentUser)
    console.log(userProfile)
    return (
        <div className="container">
            <div className="center-align" style={{ fontSize: "3vw" }}>
                <h2>Welcome to the Lifestyle App</h2>
                <h3>A collection of useful stuff</h3>
            </div>
            {user ? <div></div> : <div style={{ fontSize: "4vw" }} className="center-align">
                <p>Please <Link to="/login"><span className="red-text">LOG IN</span></Link> to use the app.</p>
                <p>Don't have an account?</p><p><Link to="/signup"><span className="red-text">SIGN UP</span></Link></p>
            </div>
            }
        </div>
    )
}

export default Homepage;