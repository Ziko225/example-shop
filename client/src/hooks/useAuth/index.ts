import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { refresh } from "../../http/userApi";

export type UserData = {
    email: string;
    role: string;
    isActivated: boolean;
} | undefined;

const useAuth = () => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem("token"));
    const [userData, setUserData] = useState<UserData | undefined>();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        refresh()
            .then(data => {
                if (!data) {
                    return setIsAuth(false);
                }
                setUserData(jwtDecode(data));
                setAccessToken(data);
            })
            .catch(() => setIsAuth(false));
    }, []);

    return { isAuth, userData, accessToken };
};

export default useAuth;