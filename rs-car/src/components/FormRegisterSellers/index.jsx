import { useEffect, useState } from "react";
import iconCloseModal from "../../assets/icons/icon-close-modal.svg";
import { useGlobal } from "../../Contexts/GlobalContexts";
import { useSellers } from "../../Contexts/SellersContexts";
import { editDataArray, maskCPF, treatValuesInputStrings, validateCPF, validateEmail } from "../../utils/functions";
import { postSeller, putSeller } from "../../utils/request";
import "./style.css";

function FormRegisterSeller({ seller }) {
    const [form, setForm] = useState({ name: "", email: "", cpf: "" });
    const { sellers, setSellers } = useSellers();

    const { setComponentModal, setShowModal,
        setSuccessCard, setErrorCard, } = useGlobal();

    useEffect(() => {
        if (seller) {
            setForm({
                name: seller.nome,
                email: seller.email,
                cpf: maskCPF(seller.cpf)
            })
        }
    }, [])

    function handleCloseModal() {
        setComponentModal("")
        setShowModal(false)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.name.trim()) return setErrorCard("O campo nome é obrigatório");
        if (!validateEmail(form.email).status) return setErrorCard(validateEmail(form.email).message);
        if (!validateCPF(form.cpf).status) return setErrorCard(validateCPF(form.cpf).message);

        const data = {
            nome: form.name.trim(),
            email: validateEmail(form.email).email,
            cpf: validateCPF(form.cpf).cpf
        }
        try {
            if (seller) {
                const response = await putSeller(seller.id, data);
                const newData = editDataArray(sellers, seller.id, response.data[0])
                setSellers(newData)
                setSuccessCard("Vendedor atualizado com sucesso")
            } else {
                const response = await postSeller(data);
                setSellers([response.data[0], ...sellers])
                setSuccessCard("Vendedor cadastrado com sucesso")
            }
            handleCloseModal()

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    return setErrorCard(error.response.data.message)
                }
            }
            seller
                ? setErrorCard("Vendedor não atualizado")
                : setErrorCard("Vendedor não cadastrado")
        }
    }
    return (
        <div>
            <form className="form-modal-register-sellers" onSubmit={handleSubmit}>
                <div className="flex-row-center">
                    <h1>{seller ? "Editar Vendedor" : "Cadastrar Vendedor"}</h1>
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
                        htmlFor="name">
                        Nome
                    </label>
                    <input
                        maxLength={100}
                        className="input-register-sellers"
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({
                            ...form,
                            [e.target.name]: treatValuesInputStrings(e.target.value)
                        })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        maxLength={100}
                        className="input-register-sellers"
                        id="email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="flex-column div-input-register-sellers">
                    <label
                        className="label-register-sellers"
                        htmlFor="cpf">
                        CPF
                    </label>
                    <input
                        maxLength={14}
                        className="input-register-sellers"
                        id="cpf"
                        type="text"
                        name="cpf"
                        value={form.cpf}
                        onChange={(e) => setForm({
                            ...form, [e.target.name]: maskCPF(e.target.value)
                        })}
                    />
                </div>
                <div className="flex-row-center">
                    <button className="btn-form">{seller ? "Editar" : "Cadastrar"}</button>
                </div>
            </form>
        </div>
    )
}

export default FormRegisterSeller;