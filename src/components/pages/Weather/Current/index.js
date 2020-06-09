import React, { useState } from 'react';
import Conditions from '../Conditions/Current';
import { Link } from "react-router-dom";

const Forecast = () => {
    // Load user profile from localStorage, extract user's city and set as default form inpu
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")))
    let [city, setCity] = useState(userProfile ? userProfile.city : '');
    let [responseObj, setResponseObj] = useState({});
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const getForecast = async (e) => {
        try {
            e.preventDefault();
            if (city.length === 0) {
                return setError(true);
            }
            // Clear state in preparation for new data
            setError(false);
            setResponseObj({});
            setLoading(true);

            let uriEncodedCity = encodeURIComponent(city);
            let response = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_API_KEY
                }
            })
            let data = await response.json();
            if (data.cod !== 200) {
                setError(true);
                setLoading(false);
                throw new Error()
            }
            setResponseObj(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    }
    return (
        <div>
            <div>
                <h1>Find Current Weather Conditions</h1>
                <div className="section">
                    <Link to="/five-day">
                        <button className="button btn-large teal lighten-5 blue-text text-darken-1 hoverable">
                            <span>Get 5-day forecast</span>
                            <i className="material-icons right">date_range</i>
                        </button>
                    </Link>
                </div>
                <form onSubmit={getForecast}>
                    <div className="row">
                        <div className="col s12 m10 offset-m1 l8 offset-l2  valign-wrapper center-align">
                            <div className="col s5 m5 l4" >
                                <span className="flow-text">Get weather for:</span>
                            </div>
                            <div className="col s7 m7 l8">
                                <div className="input-field">
                                    <input
                                        type="text"
                                        placeholder="Enter City"
                                        id="city_name_inline"
                                        maxLength="50"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container col s6 offset-s3 m6 offset-m3 l6 offset-l3">
                            <label className="left white-text">
                                <input
                                    type="radio"
                                    name="units"
                                    checked={unit === "imperial"}
                                    value="imperial"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                <span>Fahrenheit</span>
                            </label>
                            <label className="white-text">
                                <input
                                    type="radio"
                                    name="units"
                                    checked={unit === "metric"}
                                    value="metric"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                <span>Celcius</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="button btn-large" type="submit">Get Weather</button>
                    </div>
                </form>
                <Conditions
                    responseObj={responseObj}
                    error={error}
                    loading={loading}
                />
            </div>
            <div className="row">
                <div className="flow-text col s8 offset-s2 m4 l4">
                    <p>Need weather for another location?</p>
                    <p>Enter a new city and press 'Get Weather'</p>
                </div>
            </div>
        </div>
    )
}
export default Forecast;