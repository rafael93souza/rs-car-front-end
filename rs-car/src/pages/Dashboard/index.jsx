import { useEffect, useState } from "react";
import SellersGraphics from "../../components/SellersGraphics";
import { useSales } from "../../Contexts/SalesContexts";
import { useSellers } from "../../Contexts/SellersContexts";
import { getGraphicsMonthlySum, getGraphicsSum } from "../../utils/request";
import "./style.css";

function Dashboard() {
    const { sales, setSales } = useSales()
    const { sellers, setSellers } = useSellers();
    const [sellersGraphichs, setSellersGraphichs] = useState([]);
    const [graphichsMonthlySum, setGraphichsMonthlySum] = useState([]);

    useEffect(() => {
        async function getInitial() {
            try {
                const responseGraphicsSum = await getGraphicsSum();
                const responseGraphicsMonthlySum = await getGraphicsMonthlySum();
                setSellersGraphichs(responseGraphicsSum.data)
                setGraphichsMonthlySum(responseGraphicsMonthlySum.data)
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])

    return (
        <div className="container-dashboard">
            <SellersGraphics headerGraphics={["Vendedor", "Total em vendas R$"]} data={sellersGraphichs} />
        </div>
    )
}

export default Dashboard;