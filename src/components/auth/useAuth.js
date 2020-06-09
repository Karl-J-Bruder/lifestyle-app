import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

function useAuth() {
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user)
                localStorage.setItem("userCred", JSON.stringify(user));
                console.log("Added to localstorage: ", JSON.parse(localStorage.getItem("userCred")));
                // localStorage.setItem("userProfile", JSON.stringify(loggedInUser));
                // console.log("Added to localstorage: ", JSON.parse(localStorage.getItem("userProfile")));
            } else {
                setAuthUser(null)
            }
        })
        return () => unsubscribe();
    }, [])
    return authUser;
}

export default useAuth;