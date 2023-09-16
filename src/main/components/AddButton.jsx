import "../../styles/main/components/AddButton.css";

const AddButton = ({ variant, children, onClick }) => {
  return (
    <button className={`${variant} add-button-size`} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default AddButton;
