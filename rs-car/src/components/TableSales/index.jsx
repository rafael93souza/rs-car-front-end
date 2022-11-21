import { useCars } from "../../Contexts/CarsContexts";
import { formatDateLong, maskValues } from "../../utils/functions";
import iconEdit from "../../assets/icons/icon-pen-edit.svg";
import iconDelete from "../../assets/icons/icon-trash-can.svg";
import "./style.css";
import { useSales } from "../../Contexts/SalesContexts";
import { useGlobal } from "../../Contexts/GlobalContexts";
import FormRegisterSales from "../FormRegisterSales";

function TableSales() {
    const { setSale, sales } = useSales()
    const { setComponentModal, setShowModal } = useGlobal()

    function handleEditSale(sale) {
        setComponentModal(<FormRegisterSales sale={sale} />)
        setShowModal(true)
    }
    return (
        <div className="container-table-cars">
            <table className="table-cars">
                <thead className="thead">
                    <tr className="thead-tr">
                        <th className="thead-tr-th-cod"> COD </th>
                        <th className="thead-tr-th">Vendedor</th>
                        <th className="thead-tr-th">Modelo</th>
                        <th className="thead-tr-th-cod">Ano</th>
                        <th className="thead-tr-th">data</th>
                        <th className="thead-tr-th-cod">Placa</th>
                        <th className="thead-tr-th">Valor Venda</th>
                        <th className="thead-tr-th-edit-delete"></th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                        return (
                            <tr key={sale.id}>
                                <td className="tbody-tr-th-cod">{sale.id}</td>
                                <td className="tbody-tr-th">{sale.nome}</td>
                                <td className="tbody-tr-th">{sale.modelo}</td>
                                <td className="tbody-tr-th-cod">{sale.ano}</td>
                                <td className="tbody-tr-th">{formatDateLong(sale.data)}</td>
                                <td className="tbody-tr-th-cod">{sale.placa}</td>
                                <td className="tbody-tr-th">{maskValues(sale.valor)}</td>
                                <td className="tbody-tr-th-edit-delete">
                                    <img src={iconEdit} alt="Clique aqui para editar"
                                        onClick={() => handleEditSale(sale)}
                                    />
                                    <img src={iconDelete} atl="Clique aqui para excluir" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableSales;