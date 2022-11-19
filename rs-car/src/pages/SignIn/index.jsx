import { useState } from "react";
import "./style.css";
import logo from '../../assets/icons/logo-rs-car.svg';
import iconShowPassword from '../../assets/icons/icon-password-show.svg';
import iconHidePassword from '../../assets/icons/icon-password-hide.svg';

function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className="container-sign-in flex-row">
            <div className="div-form-sign-in flex-column-center">

                <img className="logo-sign-in" src={logo} alt="logo RS Car" />
                <form className="form-sign-in">
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
                            type="email"
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


        </div>
    )
}

export default SignIn;