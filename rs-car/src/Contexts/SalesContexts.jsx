import { createContext, useContext, useEffect, useState } from "react";
import { getGraphicsMonthlySum } from "../utils/request";

const SalesContext = createContext({});

export default SalesContext;

export function SalesProvider(props) {
    const [sales, setSales] = useState([]);
    const [sale, setSale] = useState({});

    return (
        <SalesContext.Provider
            value={{
                sales,
                setSales,
                sale,
                setSale
            }}
        >
            {props.children}
        </SalesContext.Provider>
    );
}

export function useSales() {
    return useContext(SalesContext);
}
