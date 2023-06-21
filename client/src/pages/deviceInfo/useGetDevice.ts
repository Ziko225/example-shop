import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchOneDevice } from "../../http/shopApi";

type Device = {
    id: number;
    name: string;
    brandId: number;
    createdAt: string;
    img: string;
    price: number;
    rating: number;
    typeId: number;
    updatedAt: string;
    info: {
        title: string,
        description: string;
    }[];
};

const useGetDevice = () => {
    const [device, setDevice] = useState<Device>();

    const [searchParams] = useSearchParams();
    const typeId = searchParams.get("id") || undefined;

    const getDeviceData = async () => {
        if (!typeId) {
            return;
        }

        const data = await fetchOneDevice(typeId);

        if (!data || data instanceof Error) {
            return;
        }

        setDevice(data);
    };

    useEffect(() => {
        getDeviceData();
    }, []);

    return { device, getDeviceData };
};

export default useGetDevice;