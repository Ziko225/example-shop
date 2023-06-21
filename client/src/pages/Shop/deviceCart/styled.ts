import styled from "styled-components";
import { theme } from "../../../theme";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
    cursor: pointer;
    transition: 200ms;
    &:hover{
        transform: translateY(-13px);
        color: ${theme.colors.componentBackground};
    }
    max-width: 700px;
`;

export const Card = styled.article`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.componentBackgroundLight};
    box-shadow: ${theme.shadows.light};
    padding: 10px;
    height: 100%;
`;

export const Img = styled.img`
    height: 300px;
    object-fit: contain;
`;

export const Price = styled.span`
    font-size: 30px;
    font-weight: 700;
`;