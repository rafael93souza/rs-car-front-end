import { useEffect, useState } from "react";
import iconCloseModal from "../../assets/icons/icon-close-modal.svg";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { useSales } from "../../Contexts/SalesContexts";
import { editDataArray, formatDateLong, maskValues, treatDateInput, treatValuesInput, validateDate, validateValue } from "../../utils/functions";
import { getCarsAll, getFindCar, getSellersAll, postSale, putSale } from "../../utils/request";
import "./style.css";

function FormRegisterSales({ sale }) {
    const [sellers, setSellers] = useState([])
    const [cars, setCars] = useState([])
    const [form, setForm] = useState({ seller: "", car: "", valueCurrent: "", date: "" });
    const { sales, setSales } = useSales();

    const { setComponentModal, setShowModal,
        setSuccessCard, setErrorCard, } = useGlobal();

    useEffect(() => {
        if (sale) {
            setForm({
                seller: sale.vendedor_id,
                car: sale.carro_id,
                valueCurrent: maskValues(sale.valor),
                date: formatDateLong(sale.data)
            })

        }
        async function getAll() {
            try {
                const responseCar = await getCarsAll()
                const responseSellers = await getSellersAll()
                setSellers(responseSellers.data)
                const newCars = responseCar.data.filter((car) => {
                    return !car.vendido
                })
                if (sale) {
                    const responseFindCar = await getFindCar(sale.carro_id);
                    setCars([...newCars, responseFindCar.data])
                    return
                }
                setCars(newCars)
            } catch (error) {
                console.log(error)
            }
        }
        getAll()
    }, [])

    function handleCloseModal() {
        setComponentModal("")
        setShowModal(false)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (form.seller == "false") return setErrorCard("selecione o vendedor");
        if (!form.car) return setErrorCard("selecione o carro");
        if (!validateValue(form.valueCurrent).status)
            return setErrorCard(validateValue(form.valueCurrent).message);
        if (!validateDate(form.date).status) return setErrorCard(validateDate(form.date).message);

        const data = {
            vendedor_id: form.seller,
            carro_id: form.car,
            valor: validateValue(form.valueCurrent).valueConvert,
            data: validateDate(form.date).dateFormat
        }

        const sellerFind = sellers.find(seller => seller.id === Number(data.vendedor_id))
        const carFind = cars.find(car => car.id === Number(data.carro_id))
        const { id, ...seller } = sellerFind;
        const { id: _, ...car } = carFind;
        try {
            if (sale) {
                const response = await putSale(sale.id, data);

                const newData = editDataArray(sales, sale.id, { ...response.data[0], ...seller, ...car })
                setSales(newData)
                setSuccessCard("Venda atualizada com sucesso")
            } else {
                const response = await postSale(data);
                setSales([{ ...response.data[0], ...seller, ...car }, ...sales])
                setSuccessCard("Venda cadastrada com sucesso")
            }
            handleCloseModal()

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    return setErrorCard(error.response.data.message)
                }
            }
            sale
                ? setErrorCard("Venda não atualizada")
                : setErrorCard("Venda não cadastrada")
        }
    }
    return (
        <div>
            <form className="form-modal-register-sellers" onSubmit={handleSubmit}>
                <div className="flex-row-center">
                    <h1>{sale ? "Editar Venda" : "Cadastrar Venda"}</h1>
                    <img
                        className='icon-close-modal'
                        src={iconCloseModal}
                        alt="Clique para fechar o modal"
                        onClick={() => handleCloseModal()}
                    />
                </div>

                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="seller">
                        Vendedor
                    </label>
                    <select
                        id="seller"
                        className="input-register-sales-options"
                        name='seller'
                        value={form.seller}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    >
                        <option value="false">Selecione Vendedor</option>
                        {sellers.map(seller => {
                            return (
                                <option key={seller.id} value={seller.id}>{seller.nome}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="car">
                        Carro
                    </label>
                    <select
                        id="car"
                        className="input-register-sales-options"
                        name='car'
                        value={form.car}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    >
                        <option value={null}>Selecione Veículo</option>
                        {cars.map(car => {
                            return (
                                <option key={car.id} value={car.id}>{car.modelo}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="valueCurrent">
                        Valor
                    </label>
                    <input
                        maxLength={100}
                        className="input-register-sellers"
                        id="valueCurrent"
                        type="text"
                        name="valueCurrent"
                        value={form.valueCurrent}
                        onChange={(e) => setForm(
                            { ...form, [e.target.name]: treatValuesInput(e) })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="date">
                        Data da Venda
                    </label>
                    <input
                        maxLength={14}
                        className="input-register-sellers"
                        id="date"
                        type="text"
                        name="date"
                        value={form.date}
                        onChange={(e) => setForm({
                            ...form, [e.target.name]: treatDateInput(e)
                        })}
                    />
                </div>
                <div className="flex-row-center">
                    <button className="btn-form">{sale ? "Editar" : "Cadastrar"}</button>
                </div>
            </form>
        </div>
    )
}

export default FormRegisterSales;