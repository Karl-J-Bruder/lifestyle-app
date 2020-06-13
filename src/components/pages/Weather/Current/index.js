import React, { useState } from 'react';
import Conditions from '../Conditions/Current';
import { Link } from "react-router-dom";

const Forecast = () => {
    // Load user profile from localStorage, extract user's city and set as default form inpu
    // const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")))
    let [city, setCity] = useState('');
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
            console.error(error);
            setError(true);
            setLoading(false);
        }
    }
    return (
        <div className="container center-align">
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
                            <span className="flow-text" style={{ marginRight: "2rem" }}>Get weather for:</span>
                            <div>
                                <div className="input-field" style={{ minWidth: "150px", maxWidth: "250px" }}>
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
                        <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                            <label className="left">
                                <input
                                    type="radio"
                                    name="units"
                                    checked={unit === "imperial"}
                                    value="imperial"
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                                <span>Fahrenheit</span>
                            </label>
                            <label>
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
                    city={city}
                />
            </div>
        </div>
    )
}
export default Forecast;