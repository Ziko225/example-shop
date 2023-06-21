import { useNavigate } from "react-router-dom";
import { Card, Container, ContentBlock, DescriptionTitile, Price, Starblock, StyledButon, StyledImg, StyledStar } from "./styled";
import useGetDevice from "./useGetDevice";
import { notFoundPath } from "../../routes";

const ItemInfo = () => {
  const { device, statusMsg } = useGetDevice();

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
          <Starblock><StyledStar /> {device.rating}</Starblock>
          <Price>{device.price}$</Price>
          <StyledButon cart>Add to cart</StyledButon>
        </ContentBlock>
        {device.info ?
          <ContentBlock description>
            {device.info.map(({ title, description }) =>
              <>
                <DescriptionTitile>{title}:</DescriptionTitile>
                {description}
              </>
            )}
          </ContentBlock>
          : <h2>{statusMsg}</h2>}
      </Card>
    </Container>
  );
};

export default ItemInfo;