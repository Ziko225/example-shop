import { shopPath } from "../../routes";
import { ErrorBlock, ErrorMessage, StyledLink, StyledMain, SubTitle, Title } from "./styled";

const ErrorPage = () => {
    return (
        <StyledMain>
            <ErrorBlock>
                <Title>404</Title>
                <SubTitle>Page Not Found</SubTitle>
                <ErrorMessage>We can't find the page you're looking for. It may have existed, but it doesn't matter anymore!</ErrorMessage>
                <StyledLink to={shopPath}>GO HOME</StyledLink>
            </ErrorBlock>
        </StyledMain>
    );
};

export default ErrorPage;
