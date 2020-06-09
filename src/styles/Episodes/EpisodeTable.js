import styled from "styled-components";

export const StyledEpisodeTable = styled.table`
    border: 1px solid lightgray;
    border-collapse: collapse;
    margin: 3rem auto;
    min-height: 20vh;
    min-width: 95vw;
`;

export const StyledTbody = styled.tbody``;

export const StyledThead = styled.thead``;

export const StyledHeadTr = styled.tr`
    background-color: #2a2c2e;
`;

export const StyledTr = styled.tr`
    border: 1px solid lightgray;
    color: white;

    &:nth-child(odd) {
        background-color: #5e5e5e;
    }

    &:nth-child(even) {
        background-color: #9b9a9a;
    }
`;

export const StyledTh = styled.th`
    border: 1px solid lightgray;
`;

export const StyledTd = styled.td`
    border: 1px solid lightgray;
`;