import { useState, useEffect } from "react";
import { BrandTypes, DevicesTypes, TypeTypes, fetchBrands, fetchDevices, fetchTypes } from "../../http/shopApi";
import { useSearchParams } from "react-router-dom";

const useDevices = (selectedPage: number) => {
    const [devices, setItems] = useState<DevicesTypes | null>(null);
    const [brands, setBrands] = useState<BrandTypes | null>(null);
    const [types, setTypes] = useState<TypeTypes | null>(null);

    const [errorMsg, setErrorMsg] = useState("Loading..");

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const IDs = {
            typeId: searchParams.get("typeId") || undefined,
            brandId: searchParams.get("brandId") || undefined
        };

        fetchDevices(selectedPage, IDs).then((e) => {
            if (!e || e instanceof Error) {
                setErrorMsg(e?.message || "");
                return;
            }
            setItems(e);
        }).catch((e) => console.log(e));

    }, [searchParams, selectedPage]);

    useEffect(() => {
        if (!devices) {
            return;
        }

        fetchBrands().then((e) => {
            if (!e || e instanceof Error) {
                setErrorMsg(e?.message || "");
                return;
            }
            setBrands(e);
        });

        fetchTypes().then((e) => {
            if (!e || e instanceof Error) {
                setErrorMsg(e?.message || "");
                return;
            }
            setTypes(e);
        });
    }, [devices]);

    const getPaginations = () => {
        if (!devices?.rows) {
            return;
        }
        const pages: Array<number> = [];

        const pageCount = Math.ceil(+devices.count / 20);

        for (let i = 0; i < pageCount; i++) {
            pages.push(i + 1);
        }

        return pages;
    };

    return { devices, brands, types, errorMsg, pages: getPaginations() };
};

export default useDevices;