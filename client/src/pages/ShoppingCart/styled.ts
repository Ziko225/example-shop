import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const Header = styled.header`
    display: flex;
`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.componentBackgroundLight};
    height: 150px;
    padding: 10px 20px;
    margin-bottom: 20px;
    box-shadow: ${theme.shadows.light};
`;

export const StyledImg = styled.img`
    object-fit: cover;
    height: 100%;
    max-width: 110px;
`;

export const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-left: 10px;
`;

export const StyledButton = styled.button`
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    border: none;
    padding: 10px 20px;
    margin: 0 0 20px auto; 
    ${({ remove }: { remove?: boolean; }) => remove && css`
        border-radius: 6px;
        background-color: ${theme.colors.error};
        margin: 0 0 7px auto ;
        padding: 5px 10px;
    `}
`;

export const Price = styled.span`
    margin: auto 0 0 auto;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        font-size: 20px;
    }
`;