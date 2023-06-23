import { useContext, useEffect } from "react";
import { adminPath, loginPath, shopPath, shoppingCartPath } from "../../routes";
import { CartCount, StyledNav, StyledNavLink } from "./styled";
import { AuthContext } from "../../context/AuthContext";
import { ReactComponent as CartLogo } from "./logo.svg";
import { logout } from "../../http/userApi";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const NavBar = () => {
    const auth = useContext(AuthContext);
    const cart = useContext(ShoppingCartContext);

    useEffect(() => {
        cart?.getAll();
    }, [auth?.isAuth]);

    const click = () => {
        logout();
        auth?.setIsAuth(false);
    };

    return (
        <StyledNav>
            <StyledNavLink to={shopPath}>Example shop</StyledNavLink>
            {auth?.userData?.role === "ADMIN" && <StyledNavLink $admin to={adminPath}>Admin panel</StyledNavLink>}
            {auth?.isAuth
                ? <>
                    <StyledNavLink to={shoppingCartPath}>
                        <CartLogo />
                        {cart?.cartData[0] && <CartCount>{cart?.cartData.length}</CartCount>}
                    </StyledNavLink>
                    <StyledNavLink to={shopPath} onClick={click}>
                        Log out
                    </StyledNavLink>
                </>
                : <StyledNavLink to={loginPath}>Log in</StyledNavLink>}
        </StyledNav>
    );
};

export default NavBar;