import styled from "styled-components";

// Containers
export const StyledCurrentWeather = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
`;

export const StyledCurrentWeatherInner = styled.div`
    height: 100%;
    width: 100%;
`;

export const StyledSummaryContainer = styled.div`
    height: 50%;
    display: flex;
    width: 100%;
`;

export const StyledSummaryLeft = styled.div`
    width: 49%;
`;

export const StyledSummaryRight = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 49%;
`;

export const StyledWeatherDetails = styled.div`
    background-color: #2a2c2e;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 0.5rem auto 0 auto;
    width: 100%;
`;

export const StyledWeatherDetailsParams = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const StyledParamsContainer = styled.div`
    text-align: left;
`;


// Parameters
export const StyledTempMain = styled.p`
    font-size: 40px;
    font-weight: 700;
`;

export const StyledWeatherGraphic = styled.img`
    height: 100px;
    width: 100px;
`;

export const StyledLocationName = styled.span`
    margin: 0 3px;
    font-weight: bold;
`;

export const StyledDetailsHeader = styled.p`
    border-bottom: 1px solid lightgray;
`;