import React, { useEffect, useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { FirebaseContext } from '../../../../firebase';
import ShoppingListItem from '../ShoppingListItem';

const ShoppingListPage = (props) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [shoppingListItems, setShoppingListItems] = useState([])
    if (!user) {
        props.history.push("/login")
    }
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        setCurrentUser(info)
        getItems()
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
    }

    return (
        <div className="container center-align">
            <h1>Shopping List</h1>
            <div className="section">
                <Link to="/create-shopping-list-item">
                    <button className="btn-large z-depth-3 white blue blue-text">
                        <span>Add a new item</span>
                        <i className="material-icons right">add</i>
                    </button>
                </Link>
            </div>
            <div className="center-align" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {shoppingListItems.map((shoppingListItem, index) => (
                    <ShoppingListItem shoppingListItem={shoppingListItem} key={shoppingListItem.id} showCount={true} index={index + 1} />
                ))}
            </div>
        </div>
    )
}

export default ShoppingListPage;