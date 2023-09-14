import "../../styles/modals/components/ModalButton.css";

const ModalButton = (props) => {
  const { variant, onClick, contents, size, disabled, useInput, onChange } = props;

  return !useInput ? (
    <button disabled={disabled} className={`${size} ${variant} `} onClick={onClick} type="button">
      {contents}
    </button>
  ) : (
    <label className={`${size} ${variant} mdoal-button-label`}>
      프로필 업로드
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        className={`${size} ${variant} mdoal-button-input`}
        onChange={onChange}
      />
    </label>
  );
};

ModalButton.defaultProps = {
  variant: "contained",
  size: "lg",
  isLoading: false,

  // 아래는 버튼을 프로필 사진 제출용으로 사용하는 경우
  useInput: false,
};

export default ModalButton;
