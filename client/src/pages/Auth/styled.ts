import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { theme } from "../../theme";

export const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-top: 20vh;
    padding: 40px 50px;
    gap: 15px;
`;

type AlertProps = {
    $isSuccess?: boolean;
    $loading?: boolean;
};

export const Alerts = styled.span`
    align-self: center;
    text-align: center;
    color:${theme.colors.error};
    font-weight: 700;
    min-height: 20px;
    ${({ $loading }: AlertProps) => $loading && css`
        color:${theme.colors.componentBackground};
    `}
    ${({ $isSuccess }: AlertProps) => $isSuccess && css`
        color:${theme.colors.success};
    `}
`;

export const StyledInput = styled.input`
    padding: 14px 20px;
    border: none;
    border-radius: 6px;
    box-shadow: ${theme.shadows.light};
`;

export const ButtonBlock = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 10px;
`;

export const StyledButton = styled.button`
    padding: 10px 15px;
    color: ${theme.colors.textInComponent};
    background-color: ${theme.colors.componentBackground};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    ${({ isLink }: { isLink?: boolean; }) => isLink && css`
        background: none;
        color: ${theme.colors.componentBackground};
        padding: 0;
    `}
    &:hover{

    }
`;

export const StyledLink = styled(Link)`
    color: ${theme.colors.componentBackground};
    ${({ $last }: { $last?: boolean; }) => $last && css`
        align-self: center;
        margin-top: 10px;
    `}
`;