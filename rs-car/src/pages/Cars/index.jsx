import { useEffect } from "react";
import TableCars from "../../components/TableCars";
import { useCars } from "../../Contexts/CarsContexts";
import { getCarsAll } from "../../utils/request";
import "./style.css";

function Cars() {
    const { car, cars, setCars } = useCars();
    useEffect(() => {
        async function getInitial() {
            try {
                const response = await getCarsAll();
                setCars(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])

    return (
        <div className="container-cars">
            <div className="div-cars-headers flex-row">
                <h1>Carros Cadastrados</h1>
                <button className="btn-add-car">+ Adicionar Carro</button>
            </div>
            <TableCars />
        </div>
    )
}

export default Cars;