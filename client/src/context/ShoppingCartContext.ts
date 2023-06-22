import { createContext } from "react";
import { CartDataProps } from "../hooks/useShoppingCart";

type ShoppingCartProps = {
    cartData: CartDataProps;
    getAll: () => void;
    add: (id: number) => void;
    removeOne: (id: number) => void;
    removeAll: () => void;
} | null;

export const ShoppingCartContext = createContext<ShoppingCartProps>(null);