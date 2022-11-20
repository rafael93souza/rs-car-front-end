import { useEffect } from "react";
import TableSellers from "../../components/TableSellers";
import { useSales } from "../../Contexts/SalesContexts";
import { useSellers } from "../../Contexts/SellersContexts";
import { getSellersAll } from "../../utils/request";
import "./style.css";

function Sellers() {
    const { setSeller, seller, setSellers } = useSellers()

    useEffect(() => {
        async function getInitial() {
            try {
                const response = await getSellersAll();
                setSellers(response.data);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])
    return (
        <div className="container-sellers">
            <div className="div-cars-headers flex-row">
                <h1>Vendedores RS CAR</h1>
                <button className="btn-add-car">+ Registar vendedor</button>
            </div>
            <TableSellers />
        </div>
    )
}

export default Sellers;