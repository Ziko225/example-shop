import { useState, useCallback } from "react";

const useSelectId = (initialState?: number): [number, (id: number) => void] => {
    const [value, setValue] = useState(initialState || 0);

    const setId = useCallback((id: number) => value !== id ? setValue(id || 0) : setValue(0), [value]);

    return [value, setId];
};

export default useSelectId;