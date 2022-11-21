import { useGlobal } from "../../Contexts/GlobalContexts";
import "./style.css";

function ModalForm() {
    const { componentModal } = useGlobal();
    return (
        <div className="modal">
            {componentModal}
        </div>
    )
}

export default ModalForm;