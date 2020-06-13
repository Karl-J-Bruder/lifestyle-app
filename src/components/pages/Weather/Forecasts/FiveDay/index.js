import React, { useState } from 'react';
import moment from "moment";

const FiveDayForecast = () => {
    // Load user profile from localStorage, extract user's city and set as default form inpu
    // const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("userProfile")))
    let [city, setCity] = useState('');
    let [responseObj, setResponseObj] = useState({});
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    const convertKelvinToCelsius = (tempK) => {
        let celsius = (tempK - 273.15).toFixed(1);

        return celsius
    }

    const convertKelvinToFahrenheit = (tempK) => {
        let fahrenheit = ((tempK - 273.15) + 32).toFixed(1);
        return fahrenheit
    }

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
        <div className="container center-align">
            <div>
                <h1>5-day Weather Forecast</h1>
                <form onSubmit={getForecast}>
                    <div className="row">
                        <div className="col s12 m10 offset-m1 l8 offset-l2  valign-wrapper center-align">
                            <span className="flow-text" style={{ marginRight: "2rem" }}>Get weather for:</span>

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
                                    {unit === 'imperial' ? <td>{convertKelvinToFahrenheit(block.main?.temp_max)}</td> : <td>{convertKelvinToCelsius(block.main?.temp_max)}</td>}
                                    {unit === 'imperial' ? <td>{convertKelvinToFahrenheit(block.main?.temp_min)}</td> : <td>{convertKelvinToCelsius(block.main?.temp_min)}</td>}
                                    <td>{block.weather[0]?.main}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
            <div className="section" />
        </div>
    )
}
export default FiveDayForecast;