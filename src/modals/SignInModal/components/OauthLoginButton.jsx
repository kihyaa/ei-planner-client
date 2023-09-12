import "../../../styles/modals/SignInModal/components/OauthLoginButton.css";

const OauthLoginButton = ({ logoSrc, contents }) => {
  return (
    <button type="button" className="oauth-login-button">
      {logoSrc}
      <p>{contents}</p>
    </button>
  );
};

export default OauthLoginButton;
