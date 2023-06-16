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
      filter: brightness(150%);
      text-decoration: underline;
    }
    &:active{
      filter: brightness(50%);
      text-decoration: none;
    }
`;