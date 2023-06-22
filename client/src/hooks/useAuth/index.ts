import { useEffect, useState } from "react";
import { refresh } from "../../http/userApi";
import { AxiosError } from "axios";

export type UserData = {
    email: string;
    role: string;
    isActivated: boolean;
} | null;

export const useAuth = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        if (!isAuth) {
            setUserData(null);
        }
    }, [isAuth]);

    useEffect(() => {
        refresh()
            .then(data => {
                if (!data || data instanceof AxiosError || !data.userData?.isActivated) {
                    setIsAuth(false)
                    return;
                }

                setUserData(data.userData);
                setIsAuth(true);
            })
            .catch(() => setIsAuth(false));
    }, []);

    return { isAuth, userData, setIsAuth, setUserData };
};