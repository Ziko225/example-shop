import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const PaginationBlock = styled.div`
    grid-column-start: 2;
    grid-row-start: 3;
    margin: 30px 0 30px 20px;
`;

export const PaginationButton = styled.button`
    padding: 20px;
    background-color: ${theme.colors.componentBackgroundLight};
    margin-left: 13px;
    border: none;
    font-size: 25px;
    &:hover{
        background-color: ${theme.colors.componentBackground};
        color: ${theme.colors.textInComponent}
    }
    ${({ $active }: { $active?: boolean; }) => $active && css`
        background-color: ${theme.colors.componentBackground};
        color: ${theme.colors.textInComponent};
        filter: brightness(150%);
    `}
`;