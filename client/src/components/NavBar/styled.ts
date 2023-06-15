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
        padding: 5px;
    `}
`;