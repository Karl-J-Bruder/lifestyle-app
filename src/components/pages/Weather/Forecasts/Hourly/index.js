import React from 'react';
import nightCloudy from "../../../../../img/nightCloudy.svg";


const HourlyWeather = ({ data }) => {
    let hourlyForecasts = [];
    for (let i = 0; i < 24; i++) {
        hourlyForecasts.push(
            <div>hello</div>
        )
    }
    return (
        <div>
            <h3>Hourly Weather</h3>
            <h4>(next 24 hours)</h4>
            <div>
                {hourlyForecasts}
            </div>

        </div>
    )
}

export default HourlyWeather;