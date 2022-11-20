import "./style.css";
import { Chart, } from "react-google-charts";
import { useEffect, useState } from "react";

function SellersGraphics({ headerGraphics, data }) {
    const options = {
        title: "Ranking de Vendas",
        chartArea: { width: "50%" },
        colors: ["#b80000"],
        hAxis: {
            title: "Valores em R$",
            minValue: 0,
        },
        vAxis: {
            title: "Vendedores",
        },
        legend: { position: "bottom" },
    };
    const [dataGraphics, setDataGtaphics] = useState([])

    useEffect(() => {
        if (data.length) {
            const newData = data.map((seller) => {
                return [seller.nome, seller.soma / 100]
            })
            setDataGtaphics([headerGraphics, ...newData])
        }


    }, [data])

    return (
        <div className="container-sellers-graphics flex-column-center">
            <h1>Total de vendas por funcionários</h1>

            {dataGraphics.length &&
                <Chart
                    chartType="BarChart"
                    width="98%"
                    height="400px"
                    data={dataGraphics}
                    options={options}
                />
            }

        </div>
    )
}

export default SellersGraphics;