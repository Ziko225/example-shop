import { useState, useEffect } from "react";
import { fetchBrands, fetchDevices, fetchTypes } from "../../http/shopApi";
import { useSearchParams } from "react-router-dom";

type DevicesTypes = {
    count: number;
    limit: number;
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
} | undefined;

type BrandTypes = {
    id: number;
    name: string;
}[];

type TypeTypes = {
    id: number;
    name: string;
}[];

const useDevices = (selectedPage: number) => {
    const [devices, setItems] = useState<DevicesTypes | null>(null);
    const [brands, setBrands] = useState<BrandTypes | null>(null);
    const [types, setTypes] = useState<TypeTypes | null>(null);

    const [status, setStatus] = useState("Loading..");

    const [searchParams] = useSearchParams();

    const getDevices = async () => {
        const IDs = {
            typeId: searchParams.get("typeId") || undefined,
            brandId: searchParams.get("brandId") || undefined
        };

        const status = await fetchDevices(selectedPage, IDs);
        if (!status || status instanceof Error) {
            setStatus(status?.message || "");
            return;
        }
        setItems(status);
    };

    const getTypes = async () => {
        const status = await fetchTypes();
        if (!status || status instanceof Error) {
            setStatus(status?.message || "");
            return;
        }
        setTypes(status);
    };

    const getBrands = async () => {
        const status = await fetchBrands();
        if (!status || status instanceof Error) {
            setStatus(status?.message || "");
            return;
        }
        setBrands(status);
    };

    useEffect(() => {
        getDevices();
    }, [searchParams, selectedPage]);

    useEffect(() => {
        getBrands();
        getTypes();
    }, []);

    const getPaginations = () => {
        if (!devices?.rows) {
            return;
        }

        const pages: Array<number> = [];

        const pageCount = Math.ceil(+devices.count / devices.limit);

        for (let i = 0; i < pageCount; i++) {
            pages.push(i + 1);
        }

        return pages;
    };

    return { devices, brands, types, status, pages: getPaginations(), getTypes, getBrands, getDevices };
};

export default useDevices;