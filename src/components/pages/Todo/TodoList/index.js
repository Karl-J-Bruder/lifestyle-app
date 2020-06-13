import React, { useEffect, useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { FirebaseContext } from '../../../../firebase';
import TodoItem from '../TodoItem';


const TodoListPage = (props) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [todos, setTodos] = useState([])
    if (!user) {
        props.history.push("/login")
    }
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        setCurrentUser(info)
        getTodos()
    }, [])

    const getTodos = () => {
        firebase.db.collection("todos").onSnapshot(handleSnapshot);
    }

    const handleSnapshot = (snapshot) => {
        const todos = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        const filteredTodos = todos.filter(todo => todo.addedBy.id === currentUser.uid)
        setTodos(filteredTodos);
    }

    return (
        <div className="container center-align">
            <h1>To-do List</h1>
            <div className="section">
                <Link to="/create-todo-item">
                    <button className="btn-large z-depth-3 white blue blue-text">
                        <span>Add a new Todo</span>
                        <i className="material-icons right">add</i>
                    </button>
                </Link>
            </div>
            <div className="center-align" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {todos.map((todo, index) => (
                    <TodoItem todo={todo} key={todo.id} showCount={true} index={index + 1} />
                ))}
            </div>
        </div>
    )
}

export default TodoListPage;