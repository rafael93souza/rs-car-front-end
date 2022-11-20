import { createContext, useContext, useState } from "react";


const CarsContext = createContext({});

export default CarsContext;

export function CarsProvider(props) {
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState({});

    return (
        <CarsContext.Provider
            value={{
                cars,
                setCars,
                car,
                setCar
            }}
        >
            {props.children}
        </CarsContext.Provider>
    );
}

export function useCars() {
    return useContext(CarsContext);
}
