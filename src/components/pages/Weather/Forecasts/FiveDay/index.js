import React, { useState } from 'react';
import moment from "moment";

const FiveDayForecast = () => {
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
            let response = await fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${uriEncodedCity}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_API_KEY
                }
            })
            let data = await response.json();
            setResponseObj(data);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setError(true);
            setLoading(false);
        }
    }
    return (
        <div>
            <div>
                <h1>5-day Weather Forecast</h1>
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
                {error && <small>Please enter a valid city.</small>}
                {loading && <div>Loading...</div>}
                {responseObj.city?.name && <p className="flow-text">Weather for: <strong>{responseObj.city.name}</strong></p>}
                <table className="striped-table blue-grey lighten-4 black-text" col s8 offset-s2 m8 offset-m2 l8 offset-l2>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Hi</th>
                            <th>Lo</th>
                            <th>Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseObj.list ? responseObj.list.map((block, index) => {
                            return (
                                <tr className="row" key={index}>
                                    <td>{moment.unix(block.dt).format("ddd h A")}</td>
                                    <td>{block.main?.temp_max}</td>
                                    <td>{block.main?.temp_min}</td>
                                    <td>{block.weather[0]?.main}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
            <div className="section" />
            <div>
                <p>Need weather for another location?</p>
                <p>Enter a new city and press 'Get Forecast'</p>
            </div>
        </div>
    )
}
export default FiveDayForecast;