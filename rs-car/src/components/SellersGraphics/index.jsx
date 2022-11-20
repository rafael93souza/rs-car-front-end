import "./style.css";
import { Chart, } from "react-google-charts";
import { useEffect, useState } from "react";

function SellersGraphics({ title, headerGraphics, data }) {
    const options = {
        title: "Ranking de Vendas",
        chartArea: { width: "50%" },
        colors: ["#b80000"],
        hAxis: {
            title: headerGraphics[1],
            minValue: 0,
        },
        vAxis: {
            title: headerGraphics[0],
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
            <h1>{title}</h1>

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