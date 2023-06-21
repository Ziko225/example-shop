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
    const [statusMsg, setStatusMsg] = useState("Loading...");

    const [searchParams] = useSearchParams();
    const typeId = searchParams.get("id") || undefined;

    const getDeviceData = async () => {
        if (!typeId) {
            setStatusMsg("Id not found");
            return;
        }

        const data = await fetchOneDevice(typeId);

        if (!data || data instanceof Error) {
            setStatusMsg(data?.message || "Something get wrong");
            return;
        }

        setDevice(data);
    };

    useEffect(() => {
        getDeviceData();
    }, []);

    return { device, getDeviceData, statusMsg };
};

export default useGetDevice;