import styled from "styled-components";



export const StyledFullDay = styled.div`
    display: block;
    margin: 0.25rem 0.5rem;
`;

export const StyledHourlyEach = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 70px;
    width: 95vw;
`;

export const StyledDayHalf = styled.div`
    background-color: #181a1b;
`;

export const StyledNightHalf = styled.div`
    background-color: #2a2c2e;
`;


export const StyledContentLeft = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 49%;
`;

export const StyledContentRight = styled.div`
    align-items: center;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    justify-content: flex-end;
    padding-right: 10px;
    width: 49%;
`;

export const StyledContentImg = styled.img`
    height: 55px;
    margin: auto 0 auto 5px;
    width: 55px;
`;

export const StyledContentText = styled.p`
    margin: 0;
`;