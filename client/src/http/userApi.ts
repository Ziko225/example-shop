import { $authHost, $host } from ".";

type AuthProps = {
    data: {
        accessToken: string;
        refreshToken: string;
    } | undefined;
};

export const registration = async (email: string, password: string) => {
    const { data }: AuthProps = await $host.post("auth/registration", { email, password });
    data?.refreshToken && sessionStorage.setItem("token", data.accessToken);
    return data?.accessToken;
};

export const login = async (email: string, password: string) => {
    const { data }: AuthProps = await $host.post("auth/login", { email, password });
    return data?.accessToken;
};

export const refresh = async () => {
    try {
        const { data }: AuthProps = await $authHost.get('user/auth');
        data?.accessToken && sessionStorage.setItem("token", data?.accessToken);
        return data?.accessToken;
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
};