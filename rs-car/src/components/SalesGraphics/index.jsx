import "./style.css";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";

function SalesGraphics({ title, headerGraphics, data }) {
    const [dataGraphics, setDataGtaphics] = useState([])

    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["#b80000"],
        legend: { position: "bottom" },
    };


    useEffect(() => {
        if (data.length) {
            const newData = data.map((sales) => {
                return [sales.mes.split(" ")[0], sales.soma_mensal / 100]
            })
            setDataGtaphics([headerGraphics, ...newData])
        }
    }, [data])

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