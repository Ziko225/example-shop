import { useState, useEffect } from "react";
import { BrandTypes, DevicesTypes, TypeTypes, fetchBrands, fetchDevices, fetchTypes } from "../../http/shopApi";
import { useSearchParams } from "react-router-dom";

const useDevices = () => {
    const [items, setItems] = useState<DevicesTypes | null>(null);
    const [brands, setBrands] = useState<BrandTypes | null>(null);
    const [types, setTypes] = useState<TypeTypes | null>(null);

    const [errorMsg, setErrorMsg] = useState("Loading..");

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const IDs = {
            typeId: searchParams.get("typeId") || undefined,
            brandId: searchParams.get("brandId") || undefined
        };

        fetchDevices(1, IDs).then((e) => {
            if (!e || e instanceof Error) {
                console.log(e);
                setErrorMsg(e?.message || "");
                return;
            }
            setItems(e);
        }).catch((e) => console.log(e));

    }, [searchParams]);

    useEffect(() => {
        if (!items) {
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
    }, [items]);

    return { items, brands, types, errorMsg };
};

export default useDevices;