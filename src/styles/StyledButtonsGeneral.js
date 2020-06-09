import styled from "styled-components";


// Back button for item details/editing
export const StyledBackButton = styled.button`
    align-items: center;
    background-color: #8c2f41;
    border: 2px solid #8c2f41;
    border-radius: 10px;
    color: white;
    display: flex;
    font-size: 20px;
    height: 5rem;
    justify-content: center;
    margin: 1rem auto;
    min-width:10rem;
`;


// General purpose button

export const StyledGeneralButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 1rem;
`;

export const StyledGeneralButton = styled.button`
    align-items: center;
    background-color: #8c2f41;
    border: 2px solid #8c2f41;
    border-radius: 5px;
    color: white;
    display: flex;
    font-size: 16px;
    height: 3rem;
    justify-content: center;
    min-width: 5rem;
    max-width: 12rem;
`;