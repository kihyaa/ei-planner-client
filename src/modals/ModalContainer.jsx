import { useEffect } from "react";
import modalStore from "../stores/modalStore";
import "../styles/modals/ModalContainer.css";

const ModalContainer = () => {
  const { modal, removeModal } = modalStore();

  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        removeModal();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return modal && <div className="modal-container">{modal}</div>;
};

export default ModalContainer;
