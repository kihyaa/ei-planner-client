import { useState } from "react";
import DropdownBtn from "../../../assets/DropdownBtn.svg";
import "../../../styles/modals/SettingModal/components/DropDown.css";

const DropDown = ({ value, setValue }) => {
  const [dropOn, setDropOn] = useState(false);
  const menu = {
    0: "안함",
    1: "1시간",
    3: "3시간",
    5: "5시간",
    24: "1일",
    72: "3일",
  };

  const toggleDropdown = () => {
    setDropOn(!dropOn);
  };

  const handleItemClick = (itemValue) => {
    setValue(itemValue);
    toggleDropdown();
  };

  return (
    <>
      <button type="button" className="setting-drop-down-container" onClick={toggleDropdown}>
        <p>{menu[value]}</p>
        <img src={DropdownBtn} alt="선택" className={`setting-drop-down-btn ${dropOn ? "setting-drop-down-on" : ""}`} />
      </button>
      {dropOn && (
        <ul className="setting-drop-down-menu">
          {Object.keys(menu).map((key) => (
            <li key={key} onClick={() => handleItemClick(key)} role="presentation">
              {menu[key]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DropDown;
