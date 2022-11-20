import { useEffect, useState } from "react";
import GraphicsMonthlySum from "../../components/GraphicsMonthlySum";
import SellersGraphics from "../../components/SellersGraphics";
import { useSales } from "../../Contexts/SalesContexts";
import { useSellers } from "../../Contexts/SellersContexts";
import { getGraphicsMonthlySum, getGraphicsSum } from "../../utils/request";
import "./style.css";

function Dashboard() {
    const formatterDate = Intl.DateTimeFormat('pt-BR', {
        year: "numeric",
        month: "long"
    });

    const { sales, setSales } = useSales()
    const { sellers, setSellers } = useSellers();
    const [sellersGraphichs, setSellersGraphichs] = useState([]);
    const [graphichsMonthlySum, setGraphichsMonthlySum] = useState([]);
    const [currentMonthlySum, setCurrentMonthlySum] = useState({});

    useEffect(() => {
        async function getInitial() {
            try {
                const responseGraphicsSum = await getGraphicsSum();
                const responseGraphicsMonthlySum = await getGraphicsMonthlySum();
                setSellersGraphichs(responseGraphicsSum.data)
                setGraphichsMonthlySum(responseGraphicsMonthlySum.data);
                const currentMonthlySumData = responseGraphicsMonthlySum.data.find(data => {
                    return data.mes === formatterDate.format(new Date())
                })
                setCurrentMonthlySum(currentMonthlySumData);
            } catch (error) {
                console.log(error)
            }
        }
        getInitial()
    }, [])

    return (
        <div className="container-dashboard">
            <div className="div-cards-graphics-dashboard flex-row">
                <GraphicsMonthlySum
                    title="Total Vendas"
                    styleClass="current-sales"
                    data={currentMonthlySum}
                />

                <GraphicsMonthlySum
                    title="Carros vendidos"
                    styleClass="current-cars-sales"
                    data={currentMonthlySum}
                />

                <GraphicsMonthlySum
                    title="Valor Medio"
                    styleClass="current-average-sales"
                    data={currentMonthlySum}
                />

            </div>
            <SellersGraphics
                headerGraphics={["Vendedor", "Total em vendas R$"]}
                data={sellersGraphichs}
            />
        </div>
    )
}

export default Dashboard;