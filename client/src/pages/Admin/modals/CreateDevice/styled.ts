import styled from "styled-components";
import { theme } from "../../../../theme";
import { StyledInput } from "../common/styled";

export const DescriptionBlock = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    width: 100%;
`;

export const DescriptionTitle = styled.h3`
    margin: 0;
`;

export const Description = styled.span`
    grid-column-start:2;
    grid-row-start: 2;
`;

export const RemoveButton = styled.button`
    background-color: ${theme.colors.componentBackground};
    color: ${theme.colors.textInComponent};
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 50%;
`;

export const PriceInput = styled(StyledInput)`
    align-self: flex-end;
    width: auto;
`