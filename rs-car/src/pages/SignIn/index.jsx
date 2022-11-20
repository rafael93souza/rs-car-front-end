import { useState } from "react";
import "./style.css";
import logo from '../../assets/icons/logo-rs-car.svg';
import iconShowPassword from '../../assets/icons/icon-password-show.svg';
import iconHidePassword from '../../assets/icons/icon-password-hide.svg';
import { validateEmail } from "../../utils/functions";
import { useGlobal } from "../../Contexts/GlobalContexts";
import ErrorCard from "../../components/ErrorCard";
import SuccessFullCard from "../../components/SuccessFullCard";
import { postLogin } from "../../utils/request";
import { setItem } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(true);
    const { successCard, errorCard, setErrorCard, setAdmin } = useGlobal();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateEmail(form.email).status) {
            return setErrorCard(validateEmail(form.email).message);
        }
        if (!form.password.trim()) {
            return setErrorCard("O Campo senha é obrigatório");
        }
        try {
            const response = await postLogin({ email: form.email, senha: form.password });
            setItem("token", response.data.token)
            setItem("user", response.data.admin.id)
            setItem("name", response.data.admin.nome)
            setAdmin(response.data.admin)
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
            if (error.response.data) {
                setErrorCard(error.response.data.message)
            }
        }
    }
    return (
        <div className="container-sign-in flex-row">
            <div className="div-form-sign-in flex-column-center">

                <img className="logo-sign-in" src={logo} alt="logo RS Car" />
                <form
                    onSubmit={handleSubmit}
                    className="form-sign-in">
                    <h1 className="form-h1">Faça login</h1>
                    <div className="flex-column div-input-sign-in">
                        <label
                            className="label-sign-in"
                            htmlFor="email">
                            E-mail
                        </label>
                        <input
                            className="input-sign-in"
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="flex-column div-input-sign-in relative">
                        <img
                            onClick={() => setShowPassword(!showPassword)}
                            className="icon-show-password"
                            src={showPassword ? iconHidePassword : iconShowPassword}
                            alt={showPassword ? "Clique para mostrar senha" : "clique para esconder senha"}
                        />
                        <label
                            className="label-sign-in"
                            htmlFor="password">
                            Senha
                        </label>
                        <input
                            className="input-sign-in"
                            id="password"
                            type={showPassword ? "password" : "text"}
                            name="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="div-button-sign-in flex-row-center">
                        <button className="btn-sign-in">Entrar</button>
                    </div>
                </form>
            </div>
            <span className="copyright-sign-in">© 2016-2022 RS CAR - Todos os direitos reservados.</span>

            <div className='div-error-success-sign-in'>
                {errorCard && <ErrorCard pag='sign-in' />}
                {successCard && <SuccessFullCard pag='sign-in' />}
            </div>
        </div>
    )
}

export default SignIn;