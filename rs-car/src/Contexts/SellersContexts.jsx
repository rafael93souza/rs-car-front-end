import { createContext, useContext, useState } from "react";

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
