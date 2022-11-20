import "./style.css";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";

function SalesGraphics({ title, headerGraphics, data }) {
    const [dataGraphics, setDataGtaphics] = useState([])
    const [colors, setColors] = useState("#b80000")
    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: [colors],
        legend: { position: "bottom" },
    };


    useEffect(() => {
        if (data.length) {
            if (title === 'Total de vendas últimos meses') {
                const newData = data.map((sales) => {
                    return [sales.mes.split(" ")[0], sales.soma_mensal / 100]
                })
                setColors("#6e0000")
                setDataGtaphics([headerGraphics, ...newData])
            } else if (title === 'Total de carros vendidos nos últimos meses') {
                const newData = data.map((sales) => {
                    return [sales.mes.split(" ")[0], sales.quantidade_vendas]
                })
                setColors("#b80000")
                setDataGtaphics([headerGraphics, ...newData])
            } else if (title === "Media de vendas dos últimos meses") {
                const newData = data.map((sales) => {
                    return [sales.mes.split(" ")[0], sales.media_mensal / 100]
                })
                setColors("#6e0000")
                setDataGtaphics([headerGraphics, ...newData])
            }

        }
    }, [data, title])

    return (
        <div className="container-sales-graphics flex-column-center">
            <h1>{title}</h1>

            {dataGraphics.length &&
                <Chart
                    chartType="ColumnChart"
                    width="98%"
                    height="400px"
                    data={dataGraphics}
                    options={options}
                />
            }

        </div>
    )
}

export default SalesGraphics;