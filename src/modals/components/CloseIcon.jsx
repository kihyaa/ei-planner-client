import XIncon from "../../assets/X.svg";
import modalStore from "../../stores/modalStore";

const CloseIcon = () => {
  const { removeModal } = modalStore();
  return (
    <button type="button" onClick={() => removeModal()}>
      <img src={XIncon} alt="닫기" />
    </button>
  );
};

export default CloseIcon;
