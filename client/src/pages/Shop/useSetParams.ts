import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useSetParams = (selectedBrand: number, selectedType: number) => {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!selectedBrand && !selectedType) {
            setSearchParams();
        }

        if (selectedBrand && !selectedType) {
            setSearchParams({
                "brandId": selectedBrand.toString()
            });
        }

        if (selectedType && !selectedBrand) {
            setSearchParams({
                "typeId": selectedType.toString()
            });
        }

        if (selectedType && selectedBrand) {
            setSearchParams({
                "brandId": selectedBrand.toString(),
                "typeId": selectedType.toString(),
            });
        }
    }, [selectedType, selectedBrand]);
};

export default useSetParams;