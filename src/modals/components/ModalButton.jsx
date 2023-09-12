import "../../styles/modals/components/ModalButton.css";

const ModalButton = (props) => {
  const { variant, onClick, contents, size } = props;

  return (
    <button className={`${size} ${variant}`} onClick={onClick} type="button">
      {contents}
    </button>
  );
};

ModalButton.defaultProps = {
  variant: "contained",
  size: "lg",
};

export default ModalButton;
