import { AxiosError } from "axios";
import { $authHost, $host } from ".";
import jwtDecode from "jwt-decode";
import { UserData } from "../hooks/useAuth";

export type AuthProps = {
    data: {
        accessToken: string;
        refreshToken: string;
    } | undefined;
};

export const registration = async (email: string, password: string) => {
    try {
        const { data }: AuthProps = await $host.post("user/registration", { email, password });

        if (!data) {
            return new AxiosError("Something get wrong");
        }

        data.accessToken && sessionStorage.setItem("token", data.accessToken);

        const userData = jwtDecode<UserData>(data.accessToken);

        return userData;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export const login = async (email: string, password: string) => {
    try {
        const { data }: AuthProps = await $host.post("user/login", { email, password });
        data?.accessToken && sessionStorage.setItem("token", data.accessToken);
        if (!data) {
            return new AxiosError("Something get wrong");
        }

        sessionStorage.setItem("token", data.accessToken);

        const userData = jwtDecode<UserData>(data.accessToken);

        return userData;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export const logout = async () => {
    try {
        return await $authHost.post("user/logout");
    } catch (error) {
        if (error instanceof AxiosError) {
            return error;
        }
    }
};

export const refresh = async () => {
    try {
        const { data }: AuthProps = await $authHost.get('user/refresh');

        if (!data) {
            return new AxiosError("Something get wrong");
        }

        sessionStorage.setItem("token", data.accessToken);

        const userData = await jwtDecode<UserData>(data.accessToken);

        return userData;
    } catch (error) {
        return;
    }
};