import styled from "styled-components";
import { theme } from "./theme";

export const StyledNav = styled.nav`
    align-items: center;
    border: 2px solid red;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    margin: 0 auto;
    min-width: 95vw;
    min-height: 20vh;
    
    @media (min-width: ${({ theme }) => theme.tablet}){
        grid-template-columns: repeat(2, 1fr);
        min-height: 15vh;
    }

    @media (min-width: ${({ theme }) => theme.desktop}){
        grid-template-columns: repeat(4, 1fr);
        min-height: 10vh;
    }
`;

export const StyledList = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
`;

export const StyledNavButton = styled.button`
    color: blue;
    font-size: 15px;
    font-weight: bold;
    
`;

export const StyledLink = styled.a`
    text-decoration: none;
`;