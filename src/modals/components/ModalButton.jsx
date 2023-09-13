import "../../styles/modals/components/ModalButton.css";

const ModalButton = (props) => {
  const { variant, onClick, contents, size, disabled } = props;

  return (
    <button disabled={disabled} className={`${size} ${variant} `} onClick={onClick} type="button">
      {contents}
    </button>
  );
};

ModalButton.defaultProps = {
  variant: "contained",
  size: "lg",
  isLoading: false,
};

export default ModalButton;
