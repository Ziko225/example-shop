import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.componentBackground};
    padding: 0 30px;
    color: ${theme.colors.textInComponent};
    min-height: 50px;
    gap: 20px;
    box-shadow: ${theme.shadows.medium};
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        padding: 0 10px;
        font-size: 13px;
        text-align: center;
        gap: 10px;
    }
`;

export const StyledNavLink = styled(NavLink)`
    color: ${theme.colors.textInComponent};
    display: flex;
    align-items: center;
    :nth-child(1){
        font-weight: 700;
        margin-right: auto;
    }
    ${({ $admin }: { $admin?: boolean; }) => $admin && css`
        border: 1px solid ${theme.colors.textInComponent};
        border-radius: 10px;
        padding: 5px 7px;
    `}
    &:hover{
      filter: brightness(80%);
    }
    &:active{
      filter: brightness(60%);
    }
`;

export const CartCount = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.componentBackgroundLight};
    color: ${theme.colors.text};
    font-weight: 700;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    margin: 0 0 -3px -12px;
    padding-top: 4px;
    align-self: flex-end;
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        padding: 3px 5px 0;
        font-size: 13px;
        text-align: center;
        min-width: 17px;
        height: 17px;
    }
`;