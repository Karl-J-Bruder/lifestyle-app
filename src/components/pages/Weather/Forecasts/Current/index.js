import React from 'react';
import nightCloudy from "../../../../../img/nightCloudy.svg";
import moment from 'moment';
import { NavLink } from "react-router-dom";
import WeatherFetcher from '../../WeatherFetcher';
import HourlyWeather from '../Hourly';
import TenDayWeather from '../FiveDay';
import ForecastTabs from '../../ForecastTabs';
import clearSky from "../../../../../img/openWeather/clearSky.png";
import fewClouds from "../../../../../img/openWeather/fewClouds.png";
import scatteredClouds from "../../../../../img/openWeather/scatteredClouds.png";
import brokenClouds from "../../../../../img/openWeather/brokenClouds.png";
import showerRain from "../../../../../img/openWeather/showerRain.png";
import rain from "../../../../../img/openWeather/rain.png";
import thunderstorm from "../../../../../img/openWeather/thunderstorm.png";
import snow from "../../../../../img/openWeather/snow.png";
import mist from "../../../../../img/openWeather/mist.png";

const dummy = {
    "coord": { "lon": -0.13, "lat": 51.51 },
    "weather": [{ "id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09d" }],
    "base": "stations", "main": { "temp": 280.32, "pressure": 1012, "humidity": 81, "temp_min": 279.15, "temp_max": 281.15 },
    "visibility": 10000, "wind": { "speed": 4.1, "deg": 80 }, "clouds": { "all": 90 }, "dt": 1485789600,
    "sys": { "type": 1, "id": 5091, "message": 0.0103, "country": "GB", "sunrise": 1485762037, "sunset": 1485794875 },
    "id": 2643743, "name": "Tokyo", "cod": 200
}

// Get current time and assign to variable
const currentTime = moment(Date.now()).format('MMMM Do YYYY, h:mm a')

const toInches = 0.0295301;

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

// Chooses appropriate weather icon based on "description" parameter of API call
const iconSelector = (description) => {
    switch (description) {
        case "clear sky":
            return clearSky
        case "few clouds":
            return fewClouds
        case "scattered clouds":
            return scatteredClouds
        case "broken clouds":
            return brokenClouds
        case "shower rain":
            return showerRain
        case "light rain":
            return showerRain
        case "rain":
            return rain
        case "thunderstorm":
            return thunderstorm
        case "snow":
            return snow
        case "mist":
            return mist
    }
}

const CurrentWeather = ({ data }) => {
    return (
        <div className="section">
            <div className="row">
                <div className="col s12 m6 l6 offset-m3 offset-l3">
                    <div className="card large blue-grey darken-1">
                        <div className="card-content">
                            <div className="section">
                                <p className="flow-text">Current weather for {data && data.sys && data.sys.country && <span>{data.name}, {data.sys.country}</span>}</p>
                                <p> ({currentTime})</p>
                            </div>
                            {data && data.main && data.main.temp && <p className="flow-text">{Math.round(data.main.temp)}°</p>}
                            {data && data.main && data.main.feels_like && <p className="flow-text">Feels like: {Math.round(data.main.feels_like)}°</p>}
                            {data && data.main && data.main.temp_min && data.main.temp_max && <p className="flow-text">Hi {Math.round(data.main.temp_max)}° Lo {Math.round(data.main.temp_min)}°</p>}
                            {data && data.weather && <div><div><img src={iconSelector(data.weather[0].description)} alt="" /></div><div><span className="flow-text" style={{ textTransform: "capitalize" }}>{data.weather[0].description}</span></div></div>}
                            <div className="section">
                                {data && data.sys && data.sys.country && <p className="flow-text">Weather details - {data.name}, {data.sys.country}</p>}
                                <div className="left">
                                    {data && data.main && data.main.temp_min && <p>Low: {Math.round(data.main.temp_min)}°</p>}
                                    {data && data.main && data.main.temp_max && <p>High: {Math.round(data.main.temp_max)}°</p>}
                                </div>
                                <div className="right">
                                    {data && data.main && data.main.humidity && <p>Humidity: {data.main.humidity}%</p>}
                                    {data && data.main && data.main.pressure && <p>Pressure: {Math.round(data.main.pressure * toInches)}"</p>}
                                    {data && data.wind && data.wind.speed && data.wind.deg && <p>Wind: {degToCompass(data.wind.deg)} at {data.wind.speed} mph</p>}
                                </div>
                            </div>
                        </div>
                        <div class="card-action">
                            <div className=" container">
                                <div className="flow-text left" style={{ borderRight: "1px solid #ffab40" }}><NavLink to="/weather/hourly">24-hour Forecast</NavLink></div>
                                <div className="flow-text right"><NavLink to="/weather/ten-day" style={{ marginRight: "0" }} data={data}>10-day Forecast</NavLink></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;