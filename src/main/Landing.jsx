import modalStore from "../stores/modalStore";
import SignInModal from "../modals/SignInModal/SignInModal";
import SignUpModal from "../modals/SignUpModal/SignUpModal";
import ServiceImg from "../assets/main/Service.svg";
import "../styles/main/Landing.css";

const Landing = () => {
  const { setModal } = modalStore();

  return (
    <div className="landing-page">
      <div className="landing-wrapper">
        <div className="landing-img">
          <img src={ServiceImg} alt="닫기" />
        </div>
        <div className="landing-name">Ei Planner</div>
        <div className="landing-description">아이플래너에서 작업의 우선순위를 지정하고 생산성을 높여보세요</div>
        <button
          type="button"
          onClick={() => {
            setModal(<SignUpModal />);
          }}
        >
          시작하기
        </button>
        <div className="landing-login">
          계정이 있나요?
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              setModal(<SignInModal />);
            }}
          >
            로그인하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
