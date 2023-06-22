import { useContext } from "react";
import { Card, ContentBlock, Header, Price, StyledButton, StyledImg, StyledMain } from "./styled";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const cart = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const url = process.env.REACT_APP_HOST_URL;

  const getPrice = (): number | undefined => {
    const result: Array<number> = [];
    cart?.cartData.forEach((e) => result.push(e.device.price));
    
    return result[0] && result.reduce((a, b) => a + b);
  };

  return (
    <StyledMain>
      <Header>
        <StyledButton onClick={() => navigate(-1)}>Return</StyledButton>
      </Header>
      {cart?.cartData[0] && <StyledButton onClick={() => cart?.removeAll()} remove>Remove All</StyledButton>}
      {cart &&
        cart.cartData[0]
        ? cart.cartData.map((element) =>
          <Card key={element.id}>
            <StyledImg src={`${url}/${element.device.img}`} />
            <ContentBlock>
              <StyledButton onClick={() => cart.removeOne(element.id)} remove>Remove</StyledButton>
              <span>{element.device.name}</span>
              <Price>Price: {element.device.price}$</Price>
            </ContentBlock>
          </Card>
        )
        : <h2>Shopping car is empty</h2>}
      {cart?.cartData[0] &&
        <>
          <Price>In total: {getPrice()}$</Price>
          <StyledButton onClick={() => alert("We are working on this functionality")}>Buy</StyledButton></>
      }
    </StyledMain>
  );
};

export default ShoppingCart;