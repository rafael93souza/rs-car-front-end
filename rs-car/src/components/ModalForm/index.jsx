import { useEffect } from "react";
import { useGlobal } from "../../Contexts/GlobalContexts";
import "./style.css";

function ModalForm() {
    const { componentModal } = useGlobal();
    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflowY = "hidden";

        return () => {
            body.style.overflowY = "scroll";
        };
    })
    return (
        <div className="modal">
            {componentModal}
        </div>
    )
}

export default ModalForm;