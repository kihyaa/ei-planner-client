import "../../styles/modals/components/Toggle.css";

const Toggle = ({ selected, setSelected }) => {
  return (
    <button
      type="button"
      className={`toggle-container ${selected ? "enabled" : ""}`}
      onClick={() => {
        setSelected(!selected);
      }}
    >
      <div className={`dialog-button ${selected ? "" : "disabled"}`} />
    </button>
  );
};

export default Toggle;
