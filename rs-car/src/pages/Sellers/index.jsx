import { useEffect } from "react";
import FormRegisterSeller from "../../components/FormRegisterSellers";
import TableSellers from "../../components/TableSellers";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { useSales } from "../../Contexts/SalesContexts";
import { useSellers } from "../../Contexts/SellersContexts";
import { getSellersAll } from "../../utils/request";
import "./style.css";

function Sellers() {
    const { setSeller, seller, setSellers } = useSellers()
    const { setComponentModal, setShowModal } = useGlobal()
    useEffect(() => {
        async function getInitial() {
            try {
                const response = await getSellersAll();
                setSellers(response.data);

            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])

    function handleOpenModal() {
        setComponentModal(<FormRegisterSeller />)
        setShowModal(true)
    }
    return (
        <div className="container-sellers">
            <div className="div-cars-headers flex-row">
                <h1>Vendedores RS CAR</h1>
                <button className="btn-add-car"
                    onClick={() => handleOpenModal()}
                >+ Registar vendedor</button>
            </div>
            <TableSellers />
        </div>
    )
}

export default Sellers;