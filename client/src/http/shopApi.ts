import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { $host } from "./index";
import { refresh } from "./userApi";

const authOption = (accessToken?: string | null, reqiuredParams?: AxiosRequestConfig) => {
    const param = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: reqiuredParams
    };
    return param;
};

type RequestData = {
    id?: number;
    name?: string;
    params?: AxiosRequestConfig;
} | FormData | null | undefined;

const repeatedRequestIf401error = async (error: AxiosError, name: string, requestData: RequestData, method: string) => {
    if (error.response?.status === 401 || true) {
        try {
            const data = await refresh();

            if (!data || data instanceof AxiosError) {
                return Error(data?.message);
            }

            let response;

            if (!data) {
                return Error("Please, re-log in to your account ");
            }

            if (method === "POST") response = await $host.post(name, requestData || null, authOption(data.token));

            if (method === "DELETE" && !(requestData instanceof FormData)) response = await $host.delete(name, authOption(data.token, requestData?.params));

            if (method === "GET" && !(requestData instanceof FormData)) response = await $host.get(name, authOption(data.token, requestData?.params));

            if (!response || response instanceof AxiosError) {
                return Error(response?.response ? response.response.data.message : response?.message);
            }

            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return new Error(error.response?.data.message);
            }
        }
    }
    return error;
};

const postRequest = async (path: string, requestData?: RequestData) => {
    try {
        const { data } = await $host.post(path, requestData, authOption(sessionStorage.getItem('token')));
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = await repeatedRequestIf401error(error, path, requestData, "POST");

            if (response instanceof Error) {
                return new Error(error.response ? error.response.data.message : error.message);
            }

            return response;
        }
    }
};

const getRequest = async (path: string, params?: AxiosRequestConfig) => {
    try {
        const { data }: AxiosResponse = await $host.get(path, params);

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = await repeatedRequestIf401error(error, path, { params }, "GET");

            if (response instanceof Error) {
                return new Error(error.response ? error.response.data.message : error.message);
            }

            return response;
        }
    }
};

const deleteRequest = async (path: string) => {
    try {
        const { data } = await $host.delete(path, authOption(sessionStorage.getItem('token')));

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = repeatedRequestIf401error(error, path, null, "DELETE");

            if (response instanceof Error) {
                return Error(response.message);
            }

            return response;
        }
    }
};

export const createType = async (type: string) => {
    return await postRequest("type", { name: type });
};

export const fetchTypes = async () => {
    return await getRequest("type");
};

export const removeType = async (typeId: number) => {
    return await deleteRequest("type/" + typeId);
};

export const createBrand = async (brand: string) => {
    return await postRequest("brand", { name: brand });
};

export const fetchBrands = async () => {
    return await getRequest("brand");
};

export const removeBrand = async (brandId: number) => {
    return await deleteRequest("brand/" + brandId);
};

export const createDevice = async (device: FormData) => {
    return await postRequest("device", device);
};

export const fetchDevices = async (page: number, IDs: { typeId?: string, brandId?: string; }) => {
    const headers = {
        params: {
            typeId: IDs.typeId, brandId: IDs.brandId, page
        }
    };

    return await getRequest('device/', headers);
};

export const fetchOneDevice = async (id: number | string) => {
    return await getRequest('api/device/' + id);
};

export const removeDevice = async (deviceId: number) => {
    return await deleteRequest("device/" + deviceId);
};