import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledMain = styled.main`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    padding: 20px 30px 30px;
`;

export const FilterBlockBrands = styled.div`
    grid-column-start: span 2;
    display: flex;
    margin-right: 20px;
    gap: 7px;
`;

export const FilterBlockTypes = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    gap: 7px;
    margin-top: 40px;
`;

export const ItemsBlock = styled.ul`
    padding: 0;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, auto));
    gap: 20px;
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