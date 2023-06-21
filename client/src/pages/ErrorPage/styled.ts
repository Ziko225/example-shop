import styled from "styled-components";
import { theme } from "../../theme";
import { Link } from "react-router-dom";

export const StyledMain = styled.main`
    width: 100%;
`;

export const ErrorBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 10vh;
    padding: 10px;
    max-width: 300px;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 90px;
    margin: 0;
`;

export const SubTitle = styled.h2`
    margin: 0 0 10px;
`;

export const ErrorMessage = styled.span`
    margin: 0 0 10px;
`;

export const StyledLink = styled(Link)`
    padding: 10px 15px;
    border: none;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    margin-bottom: 10px;
    border-radius: 4px;
    &:hover{
        filter: brightness(150%);
    }
`;