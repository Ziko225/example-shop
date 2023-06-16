import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ItemInfo from "./pages/ItemInfo";
import Shop from "./pages/Shop";
import ShoppingCart from "./pages/ShoppingCart";

export const
    shopPath = "/",
    itemInfoPath = "/info",
    adminPath = "/admin",
    shoppingCartPath = "/cart",
    loginPath = "/login",
    registrationPath = "/registration",
    forgotPasswordPath = "/forgot";

export const authRoutes = [
    {
        path: adminPath,
        Component: Admin,
    },
    {
        path: shoppingCartPath,
        Component: ShoppingCart,
    }
];

export const publicRoutes = [
    {
        path: shopPath,
        Component: Shop,
    },
    {
        path: loginPath,
        Component: Auth,
    },
    {
        path: registrationPath,
        Component: Auth,
    },
    {
        path: forgotPasswordPath,
        Component: Auth,
    },
    {
        path: itemInfoPath,
        Component: ItemInfo,
    },
];
