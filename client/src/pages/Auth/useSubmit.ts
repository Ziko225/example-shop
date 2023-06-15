import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { loginPath, shopPath } from "../../routes";
import { useContext, useState } from "react";
import { login, registration } from "../../http/userApi";

const useSubmit = (email: string, password: string, repeatPassword: string, isLoginPage: boolean) => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [alert, setAlert] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (auth?.isAuth) {
        navigate(shopPath);
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert("");
        setSuccess(false);

        if (password.length < 6) {
            setAlert("Password is too short, min length is 6");
            return;
        }

        if (!isLoginPage && password !== repeatPassword) {
            setAlert("Passwords do not match");
            return;
        }

        setIsLoading(true);

        const status = isLoginPage
            ? await login(email, password)
            : await registration(email, password);

        if (status instanceof Error) {
            setIsLoading(false);
            setAlert(status.message);
            return;
        }

        if (!status) {
            setAlert("Something get wrong!");
            setIsLoading(false);
            return;
        }

        setIsLoading(false);

        if (!isLoginPage) {
            setAlert("An email has been sent to your email address containing an activation link");
            setSuccess(true);
            navigate(loginPath);
            return;
        }

        auth?.setIsAuth(true);
        auth?.setUserData(status);

        navigate(shopPath);
        setSuccess(true);
    };

    return { submit, alert, isLoading, success };
};

export default useSubmit;