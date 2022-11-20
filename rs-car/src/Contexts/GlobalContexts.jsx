import { createContext, useContext, useState } from "react";
import { useSales } from "./SalesContexts";
import { useSellers } from "./SellersContexts";

const GlobalContext = createContext({});

export default GlobalContext;

export function GlobalProvider(props) {
    const [showModal, setShowModal] = useState(false);
    const [componentModal, setComponentModal] = useState("");
    const [successCard, setSuccessCard] = useState("");
    const [errorCard, setErrorCard] = useState("");
    const { sales, setSales } = useSales();
    const { sellers, setSellers } = useSellers();

    return (
        <GlobalContext.Provider
            value={{
                showModal,
                setShowModal,
                successCard,
                setSuccessCard,
                errorCard,
                setErrorCard,
                componentModal,
                setComponentModal
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}
