import React, { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";
import { isArray } from "util";
import CurrentWeather from "../Forecasts/Current";
import HourlyWeather from "../Forecasts/Hourly";
import TenDayWeather from "../Forecasts/FiveDay";
import BasicModal from "../../../modal/basicModal";


const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const suffix = "&units=imperial&appid=c2a131dddf62f16823b134566151a38e";

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isModalOpen: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isModalOpen: false,
                isError: false,
                data: action.payload
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isModalOpen: false,
                isError: true
            };
        default:
            throw new Error();
    }
};

const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        isModalOpen: false,
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });

            try {
                const result = await axios(url);

                if (!didCancel) {
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url]);
    return [state, setUrl];
};
function WeatherFetcher() {

    const [query, setQuery] = useState("london");
    const [cityNameState, setCityNameState] = useState();
    const [cityTempState, setCityTempState] = useState();
    const [cityWeatherDescState, setCityWeatherDescState] = useState();
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        baseUrl + query + suffix,
        []
    );
    useEffect(() => {
        setCityNameState(data && data.name);
        setCityTempState(data && data.main && data.main.temp);
        if (isArray(data.weather) && data.weather.length > 0) {
            setCityWeatherDescState(data.weather[0].main);
        }
    }, [data, isError, isLoading]);

    return (
        <Fragment>
            <form
                onSubmit={event => {
                    doFetch(`${baseUrl}${query}${suffix}`);
                    event.preventDefault();
                    setQuery("");
                }}
            >
                <div className="section">
                    <div className="input-field">
                        <label htmlFor="city">Search new city</label>
                        <i className="material-icons prefix">location_city</i>
                        <input
                            type="text" id="text" name="city"
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                    </div>
                </div>
                <button className="btn-large" type="button" onClick={event => {
                    doFetch(`${baseUrl}${query}${suffix}`);
                    event.preventDefault();
                    setQuery("");
                }}>
                    <span>Get Weather</span>
                    <i className="material-icons right">replay</i>
                </button>
            </form>
            {isError && <div>Something went wrong...</div>}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                    <div>
                        <CurrentWeather data={data} />
                    </div>
                )}
            {isLoading ? <BasicModal isModalOpen={isLoading} /> : null}
        </Fragment>
    );
}
export default WeatherFetcher;
