import iconEdit from "../../assets/icons/icon-pen-edit.svg";
import iconDelete from "../../assets/icons/icon-trash-can.svg";
import { useSellers } from "../../Contexts/SellersContexts";
import { maskCPF } from "../../utils/functions";
import "./style.css";

function TableSellers() {
    const { setSellers, sellers } = useSellers()

    return (
        <div className="container-table-cars">
            <table className="table-cars">
                <thead className="thead">
                    <tr className="thead-tr">
                        <th className="thead-tr-th-cod"> COD </th>
                        <th className="thead-tr-th thead-sellers">Vendedor</th>
                        <th className="thead-tr-th thead-sellers">email</th>
                        <th className="thead-tr-th thead-sellers">CPF</th>
                        <th className="thead-tr-th-edit-delete thead-sellers"></th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => {
                        return (
                            <tr key={seller.id}>
                                <td className="tbody-tr-th-cod thead-sellers">{seller.id}</td>
                                <td className="tbody-tr-th thead-sellers">{seller.nome}</td>
                                <td className="tbody-tr-th thead-sellers">{seller.email}</td>
                                <td className="tbody-tr-th thead-sellers">{maskCPF(seller.cpf)}</td>
                                <td className="tbody-tr-th-edit-delete">
                                    <img src={iconEdit} alt="Clique aqui para editar" />
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

export default TableSellers;