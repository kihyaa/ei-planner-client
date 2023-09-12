import CloseIcon from "./CloseIcon";
import "../../styles/modals/components/ModalHeader.css";

const ModalHeader = ({ title }) => {
  return (
    <div className="modal-header-contianer">
      <div className="modal-header-empty" />
      <h2>{title}</h2>
      <CloseIcon />
    </div>
  );
};

export default ModalHeader;
