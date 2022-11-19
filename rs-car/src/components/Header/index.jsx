import "./style.css";
import logoHeader from "../../assets/icons/logo-rs-car.svg"
import logOutIcon from "../../assets/icons/icon-logout.svg";
import { clear, getItem } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
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
        <header className="header">
            <img className="image-header" src={logoHeader} alt="Imagem do logo RS CAR" />
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
    )
}

export default Header;