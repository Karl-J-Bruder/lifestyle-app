import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../../../firebase';
import { Link } from 'react-router-dom';
import { buttonContentStyles } from "../../../../styles/theme";


const ShoppingListItem = ({ shoppingListItem, showCount, index }) => {
    const { firebase } = useContext(FirebaseContext);
    const [isComplete, setIsComplete] = useState(false);

    const handeDeleteItem = () => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${shoppingListItem.id}`);
        docRef.delete();
    }

    const handleCheckedItem = () => {
        const docRef = firebase.db.collection("shoppingListItems").doc(`${shoppingListItem.id}`);
        docRef.get().then(doc => {
            if (doc.exists) {
                let previousStatus = doc.data().completed;
                let newStatus = !previousStatus;
                docRef.update({ completed: newStatus })
            }
        })
        setIsComplete(!isComplete);
    }
    return (
        <div className="section">
            <div className="row">
                <div className="col s12 m12 l6">
                    <div className="card-panel horizontal grey lighten-4 black-text"
                        style={{ height: "15vh", width: "95vw", margin: "1vh auto" }}
                    >
                        <div className="card-title left">
                            <div>
                                {showCount && <span className="flow-text">{index}. </span>}
                                <span className="flow-text">{shoppingListItem.title}</span>
                            </div>
                            <div>
                                <p className="flow-text">Complete? {shoppingListItem.completed ? "Yes" : "No"}</p>
                            </div>
                        </div>
                        {/* Change size of buttons & content based on screen width */}
                        <div className="card-content right">
                            <Link to={`/shopping-list-item-details/${shoppingListItem.id}`}>
                                {window.screen.width < 450 ?
                                    <button className="btn-floating light-blue darken-4" style={{ margin: "0 5px" }}>
                                        <i className="material-icons">info_outline</i>
                                    </button>
                                    :
                                    <button className="btn-floating btn-large light-blue darken-4" style={{ margin: "0 5px" }}>
                                        <i className="material-icons" style={buttonContentStyles}>info_outline</i>
                                    </button>
                                }
                            </Link>
                            <Link to={`/edit-shopping-list-item/${shoppingListItem.id}`}>
                                {window.screen.width < 450 ?
                                    <button className="btn-floating orange darken-4" style={{ margin: "0 5px" }}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    :
                                    <button className="btn-floating btn-large orange darken-4" style={{ margin: "0 5px" }}>
                                        <i className="material-icons" style={buttonContentStyles}>edit</i>
                                    </button>
                                }
                            </Link>
                            {window.screen.width < 450 ?
                                <button
                                    onClick={() => handleCheckedItem()}
                                    className={`${shoppingListItem.completed ? "btn-floating yellow accent-4" : "btn-floating green darken-4"}`} style={{ margin: "0 5px" }}>
                                    <i className={`${shoppingListItem.completed ? "material-icons black-text" : "material-icons"}`}>
                                        {`${shoppingListItem.completed ? "undo" : "done"}`}
                                    </i>
                                </button>
                                :
                                <button
                                    onClick={() => handleCheckedItem()}
                                    className={`${shoppingListItem.completed ? "btn-floating btn-large yellow accent-4" : "btn-floating btn-large green darken-4"}`} style={{ margin: "0 5px" }}>
                                    <i className={`${shoppingListItem.completed ? "material-icons black-text" : "material-icons"}`}>
                                        {`${shoppingListItem.completed ? "undo" : "done"}`}
                                    </i>
                                </button>
                            }
                            {window.screen.width < 450 ?
                                <button
                                    onClick={() => handeDeleteItem()}
                                    className="btn-floating red accent-4">
                                    <i className="material-icons">delete</i>
                                </button>
                                :
                                <button
                                    onClick={() => handeDeleteItem()}
                                    className="btn-floating btn-large red accent-4">
                                    <i className="material-icons" style={buttonContentStyles}>delete</i>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShoppingListItem;