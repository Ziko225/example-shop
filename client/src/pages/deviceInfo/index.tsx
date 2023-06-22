import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, ContentBlock, DescriptionTitile, Price, Starblock, StyledButon, StyledImg, StyledStar } from "./styled";
import useGetDevice from "./useGetDevice";
import { loginPath, notFoundPath } from "../../routes";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { AuthContext } from "../../context/AuthContext";

const ItemInfo = () => {
  const { device } = useGetDevice();
  const cart = useContext(ShoppingCartContext);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const imgUrl = `${process.env.REACT_APP_HOST_URL}/${device?.img}`;

  if (!device) {
    navigate(notFoundPath);
    return null;
  }

  return (
    <Container>
      <StyledButon onClick={() => navigate(-1)}>Return</StyledButon>
      <Card>
        <StyledImg alt="Deviuce" src={imgUrl} />
        <ContentBlock>
          <h1>{device.name}</h1>
          <Starblock><StyledStar /> {device.rating} / 5</Starblock>
          <Price>{device.price}$</Price>
          {auth?.isAuth
            ? <StyledButon onClick={() => cart?.add(device.id)} cart>Add to cart</StyledButon>
            : <StyledButon onClick={() => navigate(loginPath)}>Log in to buy this</StyledButon>}
        </ContentBlock>
        <ContentBlock description>
          {device.info.map(({ title, description }) =>
            <>
              <DescriptionTitile>{title}:</DescriptionTitile>
              {description}
            </>
          )}
        </ContentBlock>
      </Card>
    </Container>
  );
};

export default ItemInfo;