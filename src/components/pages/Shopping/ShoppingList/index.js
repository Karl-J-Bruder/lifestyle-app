import React, { useEffect, useContext, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "../../../../firebase";
import { FirebaseContext } from '../../../../firebase';
import ShoppingListItem from '../ShoppingListItem';
import { StyledAddNewButton } from "../../../../styles/Shopping/StyledShoppingListItem";

const ShoppingListPage = (props) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [shoppingListItems, setShoppingListItems] = useState([])
    //@@@ comment out next 5 lines For development only (no redirect)
    // if (!user) {
    //     props.history.push("/login")
    // } else {
    //     console.log(user)
    // }
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        console.log("Retrieved by shoppingList: ", info)
        setCurrentUser(info)
        console.log("USER: ", currentUser)
        getItems()
        console.log("CURRENT USER: ", currentUser)
    }, [])


    function getItems() {
        firebase.db.collection("shoppingListItems").onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const shoppingListItems = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        const filteredShoppingListItems = shoppingListItems.filter(shoppingListItem => shoppingListItem.addedBy.id === currentUser.uid)
        setShoppingListItems(filteredShoppingListItems);


        // @@@ For development only (non-filtered list)
        // setShoppingListItems(shoppingListItems)
    }

    return (
        <div>
            <h1>Shopping List</h1>
            <div className="section">
                <Link to="/create-shopping-list-item">
                    <button className="btn-large z-depth-3 white blue blue-text">
                        <span>Add a new item</span>
                        <i className="material-icons right">add</i>
                    </button>
                </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {shoppingListItems.map((shoppingListItem, index) => (
                    <ShoppingListItem shoppingListItem={shoppingListItem} key={shoppingListItem.id} showCount={true} index={index + 1} />
                ))}
            </div>
        </div>
    )
}

export default ShoppingListPage;