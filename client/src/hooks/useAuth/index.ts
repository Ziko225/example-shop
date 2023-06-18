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
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (!isAuth) {
            setUserData(null);
        }
    }, [isAuth]);

    useEffect(() => {
        refresh()
            .then(data => {
                if (!data) {
                    return;
                }

                if (data instanceof AxiosError) {
                    return;
                }

                if (!data.userData?.isActivated) {
                    return;
                }

                setUserData(data.userData);
                setIsAuth(true);
            })
            .catch(() => setIsAuth(false));
    }, []);

    return { isAuth, userData, setIsAuth, setUserData };
};