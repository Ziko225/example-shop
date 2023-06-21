import { itemInfoPath } from "../../../routes";
import { Card, Img, Price, StyledLink } from "./styled";
import img404 from "./404.webp";

type Props = {
    data: {
        brandId: number;
        id: number;
        img: string;
        name: string;
        price: number;
        rating: number;
        typeId: number;
        createdAt: string;
        updatedAt: string;
    };
};

const ItemCard = ({ data }: Props) => {
    const url = process.env.REACT_APP_HOST_URL;

    return (
        <StyledLink to={`${itemInfoPath}?id=${data.id}`}>
            <Card >
                <Img src={url + "/" + data.img} defaultValue={img404} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = img404;
                }} />
                <h3>{data.name}</h3>
                <Price>{data.price} $</Price>
            </Card>
        </StyledLink>
    );
};

export default ItemCard;