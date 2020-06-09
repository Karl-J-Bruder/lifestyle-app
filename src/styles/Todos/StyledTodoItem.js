import styled from "styled-components";


export const StyledTodoItem = styled.div`
    background: lightgray;
    border: 2px solid darkgray;
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: row;
    margin: 0.25rem;
    min-height: 8rem;
    max-height: 10rem;
`;

export const StyledTodoInfo = styled.div`
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 3;
`;

export const StyledTodoNumber = styled.span`
    margin: auto 1px;
`;


export const StyledTodoTitle = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const StyledTodoInfoItem = styled.p`
    font-size: 15px;
    margin: 2px 3px;
`;

export const StyledTodoItemLabel = styled.span`
    font-size: 17px;
    font-weight: bold;
    margin-right: 5px;
`;

export const StyledTodoActions = styled.div`
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 33.33%;
`;

export const StyledTodoButton = styled.button`
    background: darkred;
    color: white;
    height: 3rem;
    width: 8rem;
`;

export const StyledAddNewButton = styled.button`
    background-color: #8c2f41;
    border: 2px solid #8c2f41;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    height: 5rem;
    margin: 1rem auto;
    width:10rem;
`;

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
    width:10rem;
`;