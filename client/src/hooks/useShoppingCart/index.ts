import { useState, useEffect } from "react";
import { addDeviceToCart, fetchCart, removeAllDevicesFromCart, removeDeviceFromCart } from "../../http/shopApi";

export type CartDataProps = {
    createdAt: string;
    device: {
        brandId: number;
        createdAt: string;
        id: number;
        img: string;
        name: string;
        price: number;
        rating: number;
        typeId: number;
        updatedAt: string;
    };
    deviceId: number;
    id: number;
    shoppingCartId: 13;
    updatedAt: string;
}[];

const useShoppingCart = () => {
    const [cartData, setCartData] = useState<CartDataProps>([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const status = await fetchCart();

        if (!status || status instanceof Error) {
            setCartData([]);
            return;
        }

        setCartData(status);
    };

    const add = async (id: number) => {
        const status = await addDeviceToCart(id);

        if (status) {
            getAll();
        }
    };

    const removeOne = async (id: number) => {
        const status = await removeDeviceFromCart(id);

        if (status) {
            getAll();
        }
    };

    const removeAll = async () => {
        const status = await removeAllDevicesFromCart();

        if (status) {
            getAll();
        }
    };

    return { cartData, getAll, add, removeOne, removeAll };
};

export default useShoppingCart;