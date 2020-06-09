import React from 'react'
import { NavLink } from "react-router-dom";

const ForecastTabs = () => {
    return (
        <div>
            <span><NavLink to="/weather/current">Current Weather</NavLink></span>
            <span><NavLink to="/weather/hourly">24-hour Forecast</NavLink></span>
            <span><NavLink to="/weather/ten-day">10-day Forecast</NavLink></span>
        </div>
    )
}

export default ForecastTabs;