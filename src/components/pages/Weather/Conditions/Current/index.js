import React from 'react';

const conditions = (props) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="row">
            <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                {props.error && <small>Please enter a valid city.</small>}
                {props.loading && <div>Loading...</div>}
                {props.responseObj.cod === 200 ?
                    <div className="card-panel cyan lighten-5 flow-text">
                        <p className="black-text">Weather in {capitalizeFirstLetter(props.city)}:</p>
                        <p>Current temp: {props.responseObj.main.temp}</p>
                        <div>
                            <span className="black-text">Hi: </span>
                            <span className="red-text text-darken-1">{Math.round(props.responseObj.main.temp_max)}</span>
                        </div>
                        <div>
                            <span className="black-text">Lo: </span>
                            <span className="blue-text text-darken-1">{Math.round(props.responseObj.main.temp_min)}</span>
                        </div>
                        <p>Humidity: {props.responseObj.main.humidity}%</p>
                        <p className="black-text">Currently: Cloudy</p>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}
export default conditions;