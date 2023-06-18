import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    margin-top: 20px;
    width: 100%;
    gap: 20px;
    ${({ $modalActive }: { $modalActive: boolean; }) => $modalActive && css`
        filter: blur(2px);
    `}
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        padding: 20px 5px;
    }
`;

export const ButtonBlock = styled.div`
    display: flex;
    width: 100%;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
`;

export const StyledButton = styled.button`
    padding: 10px 15px;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    font-weight: 700;
    border: none;
    ${({ $active }: { $active?: boolean; }) => $active && css`
        filter:brightness(160%);
    `}
`;

export const ItemsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${theme.colors.componentBackgroundLight};
    margin: 5px;
    padding: 10px;
    box-shadow: ${theme.shadows.light};
    min-width: 150px;

`;

export const StyledImg = styled.img`
    object-fit: contain;
`;

export const TitleItems = styled.h2`
    margin: 0px;
    padding: 0px;
`;

export const RemoveButton = styled(StyledButton)`
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: auto;
`;

export const ErrorElement = styled.span`
    font-size: 30px;
    color: ${theme.colors.error};
    font-weight: 700;
`;