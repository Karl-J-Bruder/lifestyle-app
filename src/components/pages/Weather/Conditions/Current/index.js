import React from 'react';

const conditions = (props) => {
    return (
        <div className="row">
            <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                {/* {props.error && <small>Please enter a valid city.</small>}
            {props.loading && <div>Loading...</div>}
            {props.responseObj.cod === 200 ?
                <div>
                    <p><strong>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                </div>
                : null
            } */}
                <div className="card-panel cyan lighten-5 flow-text">
                    <p className="black-text">Weather in SAMPLE CITY:</p>
                    <div>
                        <span className="black-text">Hi: </span>
                        <span className="red-text text-darken-1">75 </span>
                    </div>
                    <div>
                        <span className="black-text">Lo: </span>
                        <span className="blue-text text-darken-1">60 </span>
                    </div>
                    <p className="black-text">Currently: Cloudy</p>
                </div>
            </div>
        </div>
    )
}
export default conditions;