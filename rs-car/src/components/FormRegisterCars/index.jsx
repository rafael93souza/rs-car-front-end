import { useEffect, useState } from "react";
import iconCloseModal from "../../assets/icons/icon-close-modal.svg";
import { useCars } from "../../Contexts/CarsContexts";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { editDataArray, maskBoard, maskValues, maskYear, treatValuesInput, validateValue } from "../../utils/functions";
import { postCar, putCar } from "../../utils/request";
import "./style.css";

function FormRegisterCars({ car }) {
    const [form, setForm] = useState({ brand: "", model: "", year: "", board: "", price: "", color: "" });
    const { cars, setCars } = useCars();

    const { setComponentModal, setShowModal,
        setSuccessCard, setErrorCard, } = useGlobal();

    useEffect(() => {
        if (car) {
            setForm({
                brand: car.marca,
                model: car.modelo,
                year: car.ano,
                board: car.placa,
                price: maskValues(car.preco),
                color: car.cor
            })
        }
    }, []);

    function handleCloseModal() {
        setComponentModal("")
        setShowModal(false)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.model.trim()) return setErrorCard("Informe o modelo do carro");
        if (!form.brand.trim()) return setErrorCard("Informe a marca do carro");
        if (!form.year.trim()) return setErrorCard("Informe o ano do carro");
        if (form.year.trim().length !== 4) return setErrorCard("Informe um ano válido");
        if (!form.board.trim()) return setErrorCard("Informe a placa do carro");
        if (form.board.trim().length !== 8) return setErrorCard("Informe uma placa válida");
        if (!form.color.trim()) return setErrorCard("Informe a cor do carro");
        if (!validateValue(form.price).status)
            return setErrorCard(validateValue(form.price).message);

        const data = {
            modelo: form.model.trim(),
            marca: form.brand.trim(),
            placa: form.board.trim(),
            cor: form.color.trim(),
            ano: form.year.trim(),
            preco: validateValue(form.price).valueConvert
        }
        console.log(data)

        try {
            if (car) {
                const response = await putCar(car.id, data);
                const newData = editDataArray(cars, car.id, response.data[0])
                setCars(newData)
                setSuccessCard("Carro atualizado com sucesso")
            } else {
                const response = await postCar(data);
                setCars([response.data[0], ...cars])
                setSuccessCard("Carro cadastrado com sucesso")
            }
            handleCloseModal()

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    return setErrorCard(error.response.data.message)
                }
            }
            car
                ? setErrorCard("Carro não atualizado")
                : setErrorCard("Carro não cadastrado")
        }
    }
    return (
        <div>
            <form className="form-modal-register-sellers" onSubmit={handleSubmit}>
                <div className="flex-row-center">
                    <h1>{car ? "Editar Carro" : "Cadastrar Carro"}</h1>
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
                        htmlFor="model">
                        Modelo
                    </label>
                    <input
                        maxLength={100}
                        className="input-register-sellers"
                        id="model"
                        type="text"
                        name="model"
                        value={form.model}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="brand">
                        Marca
                    </label>
                    <input
                        maxLength={100}
                        className="input-register-sellers"
                        id="brand"
                        type="text"
                        name="brand"
                        value={form.brand}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="year">
                        Ano
                    </label>
                    <input
                        maxLength={4}
                        className="input-register-sellers"
                        id="year"
                        type="text"
                        name="year"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, [e.target.name]: maskYear(e) })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="board">
                        Placa
                    </label>
                    <input
                        maxLength={8}
                        className="input-register-sellers"
                        id="board"
                        type="text"
                        name="board"
                        value={form.board}
                        onChange={(e) => setForm({ ...form, [e.target.name]: maskBoard(e) })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="color">
                        Cor
                    </label>
                    <input
                        maxLength={8}
                        className="input-register-sellers"
                        id="color"
                        type="text"
                        name="color"
                        value={form.color}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="price">
                        Preço
                    </label>
                    <input
                        className="input-register-sellers"
                        id="price"
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={(e) => setForm({
                            ...form, [e.target.name]: treatValuesInput(e)
                        })}
                    />
                </div>
                <div className="flex-row-center">
                    <button className="btn-form">{car ? "Editar" : "Cadastrar"}</button>
                </div>
            </form>
        </div>
    )
}

export default FormRegisterCars;