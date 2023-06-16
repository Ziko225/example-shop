import { AxiosError, AxiosResponse } from "axios";
import { $authHost, $host } from "./index";

export const createType = async (type: string) => {
    try {
        const { data } = await $authHost.post('type', type);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export type TypeTypes = {
    id: number;
    name: string;
}[];

export const fetchTypes = async () => {
    try {
        const { data }: AxiosResponse<TypeTypes> = await $host.get('type');
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export const createBrand = async (brand: string) => {
    try {
        const { data } = await $authHost.post('brand', brand);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export type BrandTypes = {
    id: number;
    name: string;
}[];

export const fetchBrands = async () => {
    try {
        const { data }: AxiosResponse<BrandTypes> = await $host.get('brand',);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export const createDevice = async (device: string) => {
    try {
        const { data } = await $authHost.post('device', device);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export type DevicesTypes = {
    count: number;
    rows: {
        brandId: number;
        id: number;
        img: string;
        name: string;
        price: number;
        rating: number;
        typeId: number;
        createdAt: string;
        updatedAt: string;
    }[];
};

export const fetchDevices = async (page: number, IDs: { typeId?: string, brandId?: string; }) => {
    try {
        const { data }: AxiosResponse<DevicesTypes> = await $host.get('device', {
            params: {
                typeId: IDs.typeId, brandId: IDs.brandId, page
            }
        });
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};

export const fetchOneDevice = async (id: number | string) => {
    try {
        const { data } = await $host.get('api/device/' + id);
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return Error(error.response ? error.response.data.message : error.message);
        }
    }
};