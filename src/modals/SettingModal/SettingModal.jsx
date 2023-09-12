import { useState } from "react";
import ModalHeader from "../components/ModalHeader";
import Toggle from "../components/Toggle";
import "../../styles/modals/SettingModal/SettingModal.css";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const SettingModal = () => {
  // useState 기본 값으로 설정 정보를 세팅해야함(원래 사용자 설정 상 토글이 켜져 있었는지)
  const [selected, setSelected] = useState(true);

  // useEffect와 사용 방법이 같으나, 첫 렌더링 시에 실행되지 않고, 상태가 변경될 때만 실행됨
  useDidMountEffect(() => {
    // Do Something, ex) 설정 변경을 axios put
  }, [selected]);

  return (
    <div className="modal modal-responsive-height modal-setting-height">
      <ModalHeader title="설정" />
      <div className="modal-contents">
        <Toggle selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default SettingModal;
