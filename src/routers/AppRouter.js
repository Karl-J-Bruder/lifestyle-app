import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../components/pages/Homepage";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import TodoListPage from "../components/pages/Todo/TodoList";
import TodoItemDetails from "../components/pages/Todo/TodoItemDetails";
import CreateTodo from "../components/pages/Todo/CreateTodo";
import EditTodo from "../components/pages/Todo/EditTodo";
import ShoppingListPage from "../components/pages/Shopping/ShoppingList";
import ShoppingItemDetails from "../components/pages/Shopping/ItemDetails";
import CreateShoppingItem from "../components/pages/Shopping/CreateItem";
import EditShoppingItem from "../components/pages/Shopping/EditItem";
import EpisodeTrackerPage from "../components/pages/Episodes/EpisodeTracker";
import EditSeriesDetailsPage from "../components/pages/Episodes/EditSeriesDetailsPage";
import Nav from "../components/Nav";
import useAuth from "../components/auth/useAuth";
import firebase, { FirebaseContext } from "../firebase";
import AddSeries from '../components/pages/Episodes/AddSeries';
import Header from '../components/Header';
import CurrentWeather from "../components/pages/Weather/Current";
import FiveDayForecast from "../components/pages/Weather/Forecasts/FiveDay";

const AppRouter = () => {
    const user = useAuth();

    return (
        <BrowserRouter>
            <FirebaseContext.Provider value={{ user, firebase }}>
                <div>
                    <Header />
                    <div className="section" style={{ marginBottom: "4rem" }}>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/todo-list" component={TodoListPage} />
                            <Route path="/todo-item-details/:id" component={TodoItemDetails} />
                            <Route path="/create-todo-item" component={CreateTodo} />
                            <Route path="/edit-todo/:id" component={EditTodo} />
                            <Route exact path="/shopping-list" component={ShoppingListPage} />
                            <Route path="/shopping-list-item-details/:id" component={ShoppingItemDetails} />
                            <Route path="/create-shopping-list-item" component={CreateShoppingItem} />
                            <Route path="/edit-shopping-list-item/:id" component={EditShoppingItem} />
                            <Route path="/weather" component={CurrentWeather} />
                            <Route path="/five-day" component={FiveDayForecast} />
                            <Route path="/episode-tracker" component={EpisodeTrackerPage} />
                            <Route path="/add-series" component={AddSeries} />
                            <Route path="/edit-series-details/:id" component={EditSeriesDetailsPage} />
                        </Switch>
                    </div>
                    {user && <Nav />}
                </div>
            </FirebaseContext.Provider>
        </BrowserRouter>
    )
};

export default AppRouter;