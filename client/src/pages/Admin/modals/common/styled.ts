import styled, { css } from "styled-components";
import { theme } from "../../../../theme";

export const ModalOutsideContainer = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    width: 100%;
    z-index: 2;
    padding-top: 20vh;
`;

export const ModularInsideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.colors.componentBackgroundLight};
    padding: 12px 20px 40px;
    width: 700px;
    margin: 0 20px 50px;
    box-shadow: ${theme.shadows.light};
    gap: 20px 0;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

export const Title = styled.h2`
    margin: 0;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
`;

export const ErrorElement = styled.span`
    color: ${theme.colors.componentBackground};
    align-self: center;
    margin-bottom: 10px;
    ${({ $isSuccess }: { $isSuccess?: boolean, $isError?: boolean; }) => $isSuccess && css`
        color: ${theme.colors.success};
    `}

    ${({ $isError }) => $isError && css`
        color: ${theme.colors.error};
    `}
`;

export const ExitButton = styled.button`
    padding: 5px 10px;
    border: none;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    font-weight: 700;
    border-radius: 6px;
`;

export const StyledInput = styled.input`
    padding: 10px;
    width: 100%;
    max-width: 350px;
    border-width: 1px;
    border-radius: 6px;
`;

export const StyledCreateButton = styled.button`
    margin-top: 30px;
    padding: 10px;
    max-width: 350px;
    border-width: 1px;
    width: 70%;
    border: none;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
`;