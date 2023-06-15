import { useContext } from "react";
import { adminPath, loginPath, shopPath, shoppingCartPath } from "../../routes";
import { StyledNav, StyledNavLink } from "./styled";
import { AuthContext } from "../../context/authContext";
import { ReactComponent as CartLogo } from "./logo.svg";
import { logout } from "../../http/userApi";

const NavBar = () => {
    const auth = useContext(AuthContext);

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
                    <StyledNavLink to={shoppingCartPath}><CartLogo /></StyledNavLink>
                    <StyledNavLink to={shopPath} onClick={click}>Log out</StyledNavLink>
                </>
                : <StyledNavLink to={loginPath}>Log in</StyledNavLink>}
        </StyledNav>
    );
};

export default NavBar;