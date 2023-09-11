import modalStore from "./stores/modalStore";
import ModalContainer from "./modals/ModalContainer";
import SignInModal from "./modals/SignInModal/SignInModal";
import SettingModal from "./modals/SettingModal/SettingModal";
import SignUpModal from "./modals/SignUpModal/SignUpModal";
import HistoryModal from "./modals/HistoryModal/HistoryModal";
import DetailModal from "./modals/DetailModal/DetailModal";
import EditModal from "./modals/EditModal/EditModal";
import "./App.css";

const App = () => {
  const { setModal } = modalStore();
  return (
    <div className="App">
      <ModalContainer />
      <button
        type="button"
        onClick={() => {
          setModal(<SignInModal />);
        }}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<SignUpModal />);
        }}
      >
        회원가입
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<SettingModal />);
        }}
      >
        설정
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<HistoryModal />);
        }}
      >
        히스토리
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<EditModal />);
        }}
      >
        작성 폼
      </button>

      <button
        type="button"
        onClick={() => {
          setModal(<DetailModal />);
        }}
      >
        일정 상세
      </button>
      <div>sdfkasldjflksajklfdsjklfjkl</div>
    </div>
  );
};

export default App;
