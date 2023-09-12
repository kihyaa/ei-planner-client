import "../../styles/modals/components/ModalSupportLink.css";

const ModalSupportLink = ({ infoMsg, linkMsg, onClick }) => {
  return (
    <div className="modal-support-link-container">
      <p>{infoMsg}</p>
      <button type="button" onClick={onClick}>
        {linkMsg}
      </button>
    </div>
  );
};

export default ModalSupportLink;
