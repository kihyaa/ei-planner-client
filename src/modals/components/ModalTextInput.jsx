import { useEffect, useRef } from "react";

import "../../styles/modals/components/ModalTextInput.css";

const ModalTextInput = ({ type, size, value, onChange, placeholder, errMsg, onKeyPress, focusMe, maxLength }) => {
  const focusRef = useRef(null);

  useEffect(() => {
    // 모달이 열릴 때 이메일 입력란에 포커스 설정
    focusMe && focusRef.current && focusRef.current.focus();
  }, []);
  return (
    <>
      <input
        ref={focusRef}
        type={type}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`modal-text-input ${errMsg && "modal-text-input-warning-border"} ${
          size === "sm" && "modal-text-input-sm"
        }`}
      />
      {errMsg && <p className="modal-text-input-warning-msg">{errMsg}</p>}
    </>
  );
};

ModalTextInput.defaultProps = {
  focusMe: false,
  size: "lg",
  placeholder: "placeholder",
};

export default ModalTextInput;
