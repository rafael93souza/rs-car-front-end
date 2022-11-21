import { useEffect } from "react";
import FormRegisterSales from "../../components/FormRegisterSales";
import TableSales from "../../components/TableSales";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { useSales } from "../../Contexts/SalesContexts";
import { getSalesAll } from "../../utils/request";
import "./style.css";

function Sales() {
    const { sale, setSales, sales } = useSales();
    const { setComponentModal, setShowModal } = useGlobal();
    useEffect(() => {
        async function getInitial() {
            try {
                const response = await getSalesAll();
                setSales(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, []);

    function handleOpenModal() {
        setComponentModal(<FormRegisterSales />)
        setShowModal(true)
    }
    return (
        <div className="container-sales">
            <div className="div-cars-headers flex-row">
                <h1>Vendas Registradas</h1>
                <button className="btn-add-car"
                    onClick={() => handleOpenModal()}
                >+ Registar venda</button>
            </div>
            <TableSales />
        </div>
    )
}

export default Sales;