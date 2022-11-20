import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});

export default GlobalContext;

export function GlobalProvider(props) {
    const [showModal, setShowModal] = useState(false);
    const [componentModal, setComponentModal] = useState("");
    const [successCard, setSuccessCard] = useState("");
    const [errorCard, setErrorCard] = useState("");
    const [admin, setAdmin] = useState({});

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
                setComponentModal,
                admin,
                setAdmin
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    return useContext(GlobalContext);
}
