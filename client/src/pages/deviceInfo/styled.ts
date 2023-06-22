import styled, { css } from "styled-components";
import { theme } from "../../theme";
import { ReactComponent as Star } from "./star.svg";

export const Container = styled.main`
    padding: 20px;
    display: flex;
    flex-direction: column;
    @media  (max-width: ${theme.breakpoints.mobileMax}) {
        padding: 10px;
    }
`;

export const Card = styled.div`
    display: grid;
    align-items: start;
    gap: 20px;
    grid-template-columns: auto 1fr;
    width: 100%;
    background-color: ${theme.colors.componentBackgroundLight};
    padding: 20px;
    box-shadow: ${theme.shadows.light};
    @media  (max-width: ${theme.breakpoints.mobileMax}) {
        display: flex;
        flex-direction: column;
        padding: 15px;
    }
`;

export const StyledImg = styled.img`
    width: 100%;
    max-width: 600px;
    object-fit: cover;
`;

export const StyledButon = styled.button`
    padding: 10px 15px;
    border: none;
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    margin-bottom: 10px;
    border-radius: 4px;
    margin-left: auto;
    ${({ cart }: { cart?: boolean; }) => cart && css`
        background-color:${theme.colors.success};
    `}
`;

export const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 300px;
    ${({ description }: { description?: boolean; }) => description && css`
        grid-column-start: span 2;
    `}
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        min-width: 110px;
    }
`;

export const DescriptionTitile = styled.h3`
    margin: 15px 0 0;
`;

export const Price = styled.span`
    margin: auto 0 0 auto;
    font-size: 70px;
    font-weight: 700;
    @media  (max-width: ${theme.breakpoints.mobileMax}) {
        font-size: 50px;
    }
`;

export const Starblock = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 25px;
`;

export const StyledStar = styled(Star)`
    color: ${theme.colors.star}
`;