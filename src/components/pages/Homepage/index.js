import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from "../../../firebase/index";
import { Link } from "react-router-dom";

const Homepage = () => {
    const { firebase } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")) ? localStorage.getItem("userProfile") : null)
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        console.log("Retrieved by Homepage: ", info)
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
        console.log("Users list: ", usersList)
        const loggedInUser = currentUser ? usersList.find(user => user.id === currentUser.uid) : null;
        console.log("Logged in user: ", loggedInUser)
        localStorage.setItem("userProfile", JSON.stringify(loggedInUser));
        setUserProfile(JSON.parse(localStorage.getItem("userProfile")))
        console.log("Profile: ", JSON.parse(localStorage.getItem("userProfile")));

    }

    return (
        <div>
            <div className="container">
                <h2>Welcome to the Lifestyle App</h2>
                <h3>A collection of useful stuff</h3>
            </div>
            {userProfile ? null :
                <div style={{ fontSize: "5vw" }}>
                    <p>Please <Link to="/login"><span className="red-text">LOG IN</span></Link> to use the app.</p>
                    <p>Don't have an account?</p><p><Link to="/signup"><span className="red-text">SIGN UP</span></Link></p>
                </div>
            }
        </div>
    )
}

export default Homepage;