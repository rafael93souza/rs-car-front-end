import { useCars } from "../../Contexts/CarsContexts";
import { maskValues } from "../../utils/functions";
import iconEdit from "../../assets/icons/icon-pen-edit.svg";
import iconDelete from "../../assets/icons/icon-trash-can.svg";
import "./style.css";
import { useGlobal } from "../../Contexts/GlobalContexts";
import FormRegisterCars from "../FormRegisterCars";
import CardDelete from "../CardDelete";

function TableCars() {
    const { cars, setCars, setCar } = useCars()
    const { setComponentModal, setShowModal } = useGlobal()

    function handleEditCars(car) {
        setComponentModal(<FormRegisterCars car={car} />)
        setShowModal(true)
    }

    function handleDeleteCars(car) {
        setComponentModal(<CardDelete id={car.id} name={car.modelo} path="carro" title="carro" array={cars} setArray={setCars} />)
        setShowModal(true)
    }

    return (
        <div className="container-table-cars">
            <table className="table-cars">
                <thead className="thead">
                    <tr className="thead-tr">
                        <th className="thead-tr-th-cod"> COD </th>
                        <th className="thead-tr-th">Modelo</th>
                        <th className="thead-tr-th">Marca</th>
                        <th className="thead-tr-th-cod">Ano</th>
                        <th className="thead-tr-th">Cor</th>
                        <th className="thead-tr-th-cod">Placa</th>
                        <th className="thead-tr-th">Preço</th>
                        <th className="thead-tr-th-edit-delete"></th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => {
                        return (
                            <tr key={car.id}>
                                <td className={car.vendido ? "tbody-tr-th-cod-sale" : "tbody-tr-th-cod"}>
                                    {car.id}
                                </td>
                                <td className="tbody-tr-th">{car.modelo}</td>
                                <td className="tbody-tr-th">{car.marca}</td>
                                <td className="tbody-tr-th-cod">{car.ano}</td>
                                <td className="tbody-tr-th">{car.cor}</td>
                                <td className="tbody-tr-th-cod">{car.placa}</td>
                                <td className="tbody-tr-th">{maskValues(car.preco)}</td>
                                <td className="tbody-tr-th-edit-delete">
                                    <img src={iconEdit} alt="Clique aqui para editar"
                                        onClick={() => handleEditCars(car)} />
                                    <img src={iconDelete} atl="Clique aqui para excluir"
                                        onClick={() => handleDeleteCars(car)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableCars;