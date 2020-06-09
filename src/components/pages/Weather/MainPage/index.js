import React, { Fragment, useState, useEffect, useReducer, useContext } from 'react';
import axios from "axios";
import { isArray } from "util";
import { FirebaseContext } from '../../../../firebase';
import WeatherFetcher from '../WeatherFetcher';
import { Route } from 'react-router-dom';
import HourlyWeather from '../Forecasts/Hourly';
import TenDayWeather from '../Forecasts/FiveDay';
import ForecastTabs from '../ForecastTabs';
import CurrentWeather from "../Forecasts/Current";

const WeatherPage = (props) => {
    const { firebase, user } = useContext(FirebaseContext);
    const [userCity, setUserCity] = useState("null");

    if (user) {
        const userRef = firebase.db.collection("users").doc(`${user.uid}`);
        userRef.get().then(doc => {
            if (doc.exists) {
                const city = doc.data().city.toLowerCase();
                setUserCity(city);
                console.log("Current user city: ", userCity)
            }
        })
    }

    // if (!user) {
    //     // props.history.push("/login")
    //     console.log("Redirect")
    // } else {
    //     const userRef = firebase.db.collection("users").doc(`${user.uid}`);
    //     userRef.get().then(doc => {
    //         if (doc.exists) {
    //             const city = doc.data().city.toLowerCase();
    //             setUserCity(city);
    //             console.log("Current user city: ", userCity)
    //         }
    //     })
    // }
    return (
        <div>
            <h1>Weather Page</h1>
            <p className="flow-text">Get the weather forecast for your city!</p>
            <div className="section">
                <p>Need to check weather for a different city?</p>
                <WeatherFetcher />
            </div>
            <Route path="/weather/hourly" component={HourlyWeather} />
            <Route path="/weather/ten-day" component={TenDayWeather} />
            <Route path="/weather/current" component={WeatherFetcher} />
        </div>
    );
}

export default WeatherPage;