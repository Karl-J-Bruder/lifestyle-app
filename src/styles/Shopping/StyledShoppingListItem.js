import styled from "styled-components";


export const StyledShoppingListItem = styled.div`
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

export const StyledShoppingListItemInfo = styled.div`
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 3;
`;

export const StyledShoppingListItemNumber = styled.span`
    margin: auto 1px;
`;


export const StyledShoppingListItemTitle = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const StyledShoppingListItemInfoItem = styled.p`
    font-size: 15px;
    margin: 2px 3px;
`;

export const StyledShoppingListItemLabel = styled.span`
    font-size: 17px;
    font-weight: bold;
    margin-right: 5px;
`;

export const StyledShoppingListItemActions = styled.div`
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 33.33%;
`;

export const StyledShoppingListItemButton = styled.button`
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
