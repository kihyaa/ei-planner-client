import "../styles/components/HeaderButton.css";

const HeaderButton = (props) => {
  const { onClick, contents } = props;
  return (
    <button onClick={onClick} type="button" className="header-button">
      {contents}
    </button>
  );
};

export default HeaderButton;
