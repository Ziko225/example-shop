import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledMain = styled.main`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    align-items: start;
    padding: 20px 30px 30px;
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: flex;
        flex-direction: column;
        grid-template-columns: 1fr;
    }
`;

export const FilterBlockBrands = styled.div`
    grid-column-start: span 2;
    display: flex;
    flex-wrap: wrap;
    margin-right: 20px;
    gap: 7px;
`;

export const FilterBlockTypes = styled.div`
    grid-row-start: span 3;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    gap: 7px;
    margin-top: 40px;
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-wrap: wrap;
        flex-direction: row;
    }
`;

export const ItemsBlock = styled.ul`
    padding: 0;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 20px;
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`;

export const StyledButton = styled.button`
    padding: 10px 15px;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    border: none;
    ${({ $active }: { $active?: boolean; }) => $active && css`
        filter:brightness(160%);
    `}
`;