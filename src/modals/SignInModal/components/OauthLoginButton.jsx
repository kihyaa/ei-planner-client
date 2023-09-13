import "../../../styles/modals/SignInModal/components/OauthLoginButton.css";

const OauthLoginButton = ({ logoSrc, contents, onClick }) => {
  return (
    <button type="button" className="oauth-login-button" onClick={onClick}>
      {logoSrc}
      <p>{contents}</p>
    </button>
  );
};

export default OauthLoginButton;
