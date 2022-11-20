import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { maskValues } from "../../utils/functions";
import "./style.css";

function GraphicsMonthlySum({ title, styleClass, data, to }) {
    const [valueCard, setValueCard] = useState("")
    useEffect(() => {
        if (title === "Carros vendidos") {
            setValueCard(data.quantidade_vendas)
        } else if (title === "Total Vendas") {
            setValueCard(maskValues(data.soma_mensal))
        } else if ((title === "Valor Medio")) {
            if (data.media_mensal) {
                const currentAverageSales = data.media_mensal.toFixed(0)
                setValueCard(maskValues(currentAverageSales))
            }
        }
    }, [data])
    return (
        <div className={`card-monthly-sum ${styleClass} `}>
            <h1>{title ? title : "carregando..."}</h1>
            <div className="div-monthly-sum">
                <h5>{data.mes ? data.mes : "carregando..."}</h5>

                <h1 className="h1-monthly-sum">{valueCard}</h1>
                <Link to={to} className="link-monthly-sum">Ver mais</Link>
            </div>
        </div>
    )
}

export default GraphicsMonthlySum;