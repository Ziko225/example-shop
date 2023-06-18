import { useState } from "react";
import { createDevice } from "../../../../http/shopApi";

type Description = {
    title: string;
    description: string;
}[];

const useCreateDevice = (
    title: string,
    description: string,
    selectedBrandId: number | undefined,
    selectedTypeId: number | undefined,
    name: string,
    price: string,
    file: HTMLInputElement["files"],
    refresh: () => void
) => {
    const [status_addDevice, setStatus_addDevice] = useState("");
    const [statusMsg_addDevice, setStatusMsg_addDevice] = useState("");
    const [statusMsg_addDescription, setStatusMsg_addDescription] = useState("");

    const [information, setInformation] = useState<Description>([]);

    const addDescription = () => {
        try {
            if (!title || !description) {
                throw new Error(title ? "Description required" : "title required");
            }

            if (information.filter((e) => e.title === title)[0]) {
                throw new Error("This title is already used!");
            }

            setStatusMsg_addDescription("");

            setInformation([...information, { title, description }]);
        } catch (error) {
            if (error instanceof Error) {
                setStatusMsg_addDescription(error.message);
            }
        }
    };

    const removeDescription = (index: number) => {
        setInformation([
            ...information.slice(0, index),
            ...information.slice(index + 1)

        ]);
    };

    const addDevice = async () => {
        try {
            window.scrollTo(0, 0);

            if (!name) {
                throw new Error("Choose a name!");
            }

            if (!selectedBrandId || !selectedTypeId) {
                throw new Error(selectedBrandId ? "Type required" : "Brand required");
            }

            setStatus_addDevice("");
            setStatusMsg_addDevice("Loading...");
            const parsedInfo = JSON.stringify(information);

            const formData = new FormData();

            formData.append("name", name);
            formData.append("price", price.toString());
            formData.append("brandId", selectedBrandId.toString());
            formData.append("typeId", selectedTypeId.toString());
            formData.append("info", parsedInfo);

            if (file) {
                formData.append("img", file[0]);
            }

            const status = await createDevice(formData);

            if (!status) {
                throw new Error("Something get wrong!");
            }

            if (status instanceof Error) {
                throw status;
            }

            setStatus_addDevice("ok");
            setStatusMsg_addDevice(`${name} added successfully`);
            setInformation([]);
            refresh();
        } catch (error) {
            if (error instanceof Error) {
                setStatus_addDevice("error");
                setStatusMsg_addDevice(error.message);
            }
        }
    };

    return {
        addDevice,
        addDescription,
        removeDescription,
        information,
        status_addDevice,
        statusMsg_addDevice,
        statusMsg_addDescription
    };
};

export default useCreateDevice;