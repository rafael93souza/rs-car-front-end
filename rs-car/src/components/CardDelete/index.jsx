import { useEffect, useState } from "react";
import iconCloseModal from "../../assets/icons/icon-close-modal.svg";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { removeDataArray } from "../../utils/functions";
import { deleteRegister, putCar } from "../../utils/request";
import "./style.css";

function CardDelete({ id, name, title, path, array, setArray }) {
    const [nameDelete, setNameDelete] = useState("");

    const { setComponentModal, setShowModal,
        setSuccessCard, setErrorCard, } = useGlobal();

    useEffect(() => {

        setNameDelete(name)

    }, []);

    function handleCloseModal() {
        setComponentModal("")
        setShowModal(false)
    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await deleteRegister(id, path);
            const newData = removeDataArray(array, id)
            setArray(newData)
            setSuccessCard(`${title} removido com sucesso`)
            handleCloseModal()

        } catch (error) {
            console.log(error)
            if (error.response) {
                if (error.response.status === 403) {
                    return setErrorCard(error.response.data.message)
                }
            }
            setErrorCard(`${title} não excluido`)
        }
    }
    return (
        <div>
            <form className="form-modal-register-sellers" onSubmit={handleSubmit}>
                <div className="flex-row-center">
                    <h1>Excluir Registro</h1>
                    <img
                        className='icon-close-modal'
                        src={iconCloseModal}
                        alt="Clique para fechar o modal"
                        onClick={() => handleCloseModal()}
                    />
                </div>
                <p className="p-delete">Deseja excluir {nameDelete}<br /> da tabela de {title}?</p>
                <div className="flex-row-center div-btn-delete">
                    <button type="button" className="btn-form-cancel"
                        onClick={() => handleCloseModal()}
                    >Cancelar</button>
                    <button className="btn-form">Excluir</button>
                </div>
            </form>
        </div>
    )
}

export default CardDelete;