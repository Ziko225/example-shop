import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { loginPath, shopPath } from "../../routes";
import { login, registration } from "../../http/userApi";

const useSubmit = (email: string, password: string, repeatPassword: string, isLoginPage: boolean) => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [alert, setAlert] = useState("");
    const [status, setStatus] = useState("");

    const isSuccess = status === "ok";
    const isLoading = status === "loading";

    useEffect(() => {
        if (auth?.isAuth) {
            navigate(shopPath);
        }
    }, [auth]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert("");
        setStatus("");

        if (password.length < 6) {
            setAlert("Password is too short, min length is 6");
            return;
        }

        if (!isLoginPage && password !== repeatPassword) {
            setAlert("Passwords do not match");
            return;
        }

        setStatus("loading");

        const status = isLoginPage
            ? await login(email, password)
            : await registration(email, password);

        if (!status || status instanceof Error) {
            setStatus("error");
            setAlert(status?.message || "Something get wrong!");
            return;
        }

        setStatus("loading");

        if (!isLoginPage) {
            setAlert("An email has been sent to your email address containing an activation link");
            setStatus("ok");
            navigate(loginPath);
            return;
        }

        auth?.setIsAuth(true);
        auth?.setUserData(status);

        navigate(shopPath);
        setStatus("ok");
    };

    return { submit, alert, isLoading, isSuccess };
};

export default useSubmit;