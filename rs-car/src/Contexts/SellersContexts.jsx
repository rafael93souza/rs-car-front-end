import { createContext, useContext, useEffect, useState } from "react";
import { getGraphicsSum } from "../utils/request";

const SellersContext = createContext({});

export default SellersContext;

export function SellersProvider(props) {
    const [sellers, setSellers] = useState([]);
    const [seller, setSeller] = useState({});

    return (
        <SellersContext.Provider
            value={{
                sellers,
                setSellers,
                seller,
                setSeller
            }}
        >
            {props.children}
        </SellersContext.Provider>
    );
}

export function useSellers() {
    return useContext(SellersContext);
}
