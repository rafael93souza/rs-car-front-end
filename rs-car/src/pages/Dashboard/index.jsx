import { useEffect, useState } from "react";
import GraphicsMonthlySum from "../../components/GraphicsMonthlySum";
import SalesGraphics from "../../components/SalesGraphics";
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
    const [sellersGraphichs, setSellersGraphichs] = useState([]);
    const [salesGraphichs, setSalesGraphichs] = useState([]);
    const [graphichsMonthlySum, setGraphichsMonthlySum] = useState([]);
    const [currentMonthlySum, setCurrentMonthlySum] = useState({});

    useEffect(() => {
        async function getInitial() {
            try {
                const responseGraphicsSum = await getGraphicsSum();
                const responseGraphicsMonthlySum = await getGraphicsMonthlySum();
                setSellersGraphichs(responseGraphicsSum.data);
                setGraphichsMonthlySum(responseGraphicsMonthlySum.data);
                setSalesGraphichs(responseGraphicsMonthlySum.data);

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
                    to="#vendas"
                    title="Total Vendas"
                    styleClass="current-sales"
                    data={currentMonthlySum}
                />

                <GraphicsMonthlySum
                    to="#carros"
                    title="Carros vendidos"
                    styleClass="current-cars-sales"
                    data={currentMonthlySum}
                />

                <GraphicsMonthlySum
                    to="#media"
                    title="Valor Medio"
                    styleClass="current-average-sales"
                    data={currentMonthlySum}
                />

            </div>
            <SellersGraphics
                title='Total de vendas por funcion??rios'
                headerGraphics={["Vendedor", "Total de vendas em R$"]}
                data={sellersGraphichs}
            />
            <div id="vendas" className="container-div-graphics">
                <SalesGraphics
                    title='Total de vendas ??ltimos meses'
                    headerGraphics={["Meses", "Total de vendas em R$ por m??s"]}
                    data={graphichsMonthlySum}
                />
            </div>


            <div id="carros" className="container-div-graphics">
                <SalesGraphics
                    title='Total de carros vendidos nos ??ltimos meses'
                    headerGraphics={["Meses", "Total de unidades vendidas por m??s"]}
                    data={graphichsMonthlySum}
                />
            </div>

            <div id="media" className="container-div-graphics">
                <SalesGraphics
                    title='Media de vendas dos ??ltimos meses'
                    headerGraphics={["Meses", "Media de vendas em R$ por m??s"]}
                    data={graphichsMonthlySum}
                />
            </div>
        </div>
    )
}

export default Dashboard;