import "../../styles/modals/components/ModalTextInput.css";

const ModalTextInput = ({ type, size, value, onChange, placeholder, errMsg }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`modal-text-input ${errMsg && "modal-text-input-warning-border"} ${
          size === "sm" && "modal-text-input-sm"
        }`}
      />
      {errMsg && <p className="modal-text-input-warning-msg">{errMsg}</p>}
    </>
  );
};

export default ModalTextInput;
