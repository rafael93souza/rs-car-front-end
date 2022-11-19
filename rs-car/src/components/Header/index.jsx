import "./style.css";
import logoHeader from "../../assets/icons/logo-rs-car.svg"
import logOutIcon from "../../assets/icons/icon-logout.svg";
import { clear, getItem } from "../../utils/storage";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    function handleLogOutUser() {
        clear();
        navigate("/sign-in")
    }
    useEffect(() => {
        setName(getItem("name"))
    }, [])

    return (
        <>
            <header className="header">
                <img className="image-header" src={logoHeader} alt="Imagem do logo RS CAR" />
                <ul className="nav-ul-header flex-row">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "nav-link-selected" : "nav-li-link"}
                    >
                        <li>HOME</li>
                    </NavLink>
                    <NavLink
                        to="/carros"
                        className={({ isActive }) => isActive ? "nav-link-selected" : "nav-li-link"}
                    >
                        <li>CARROS</li>
                    </NavLink>
                    <NavLink to="/vendas"
                        className={({ isActive }) => isActive ? "nav-link-selected" : "nav-li-link"}
                    >
                        <li>VENDAS</li>
                    </NavLink>
                    <NavLink to="/vendedores"
                        className={({ isActive }) => isActive ? "nav-link-selected" : "nav-li-link"}
                    >
                        <li>VENDEDORES</li>
                    </NavLink>
                </ul>
                <div className="user-header flex-column-center">
                    <div className="image-profile flex-column-center">
                        <h1>{name.slice(0, 2).toUpperCase()}</h1>
                    </div>
                    <h3>{name}</h3>
                </div>

                <img
                    onClick={() => handleLogOutUser()}
                    className="icon-header"
                    src={logOutIcon}
                    alt="Clique para sair"
                />
            </header>
            <Outlet />
        </>
    )
}

export default Header;