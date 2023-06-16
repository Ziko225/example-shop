import styled from "styled-components";
import { theme } from "../../../theme";
import { Link } from "react-router-dom";

export const Card = styled.article`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.componentBackgroundLight};
    box-shadow: ${theme.shadows.light};
    padding: 10px;
`;

export const Img = styled.img`
    height: 300px;
    object-fit: contain;
`;

export const StyledLink = styled(Link)`
    cursor: pointer;
`;

export const Price = styled.span`
    font-size: 30px;
    font-weight: 700;
`;