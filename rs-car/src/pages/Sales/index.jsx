import { useEffect } from "react";
import TableSales from "../../components/TableSales";
import { useSales } from "../../Contexts/SalesContexts";
import { getSalesAll } from "../../utils/request";
import "./style.css";

function Sales() {
    const { sale, setSales, sales } = useSales()
    useEffect(() => {
        async function getInitial() {
            try {
                const response = await getSalesAll();
                setSales(response.data);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])
    return (
        <div className="container-sales">
            <div className="div-cars-headers flex-row">
                <h1>Vendas Registradas</h1>
                <button className="btn-add-car">+ Registar venda</button>
            </div>
            <TableSales />
        </div>
    )
}

export default Sales;