import { useState } from "react";
import moment from "moment";
import axios from "axios";
import modalStore from "../../stores/modalStore";
import userStore from "../../stores/userStore";
import DetailModal from "../../modals/DetailModal/DetailModal";
import "../../styles/main/components/EiBlock.css";
import CheckOff from "../../assets/main/CheckOff.svg";
import CheckOn from "../../assets/main/CheckOn.svg";
import EiX from "../../assets/main/EiX.svg";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const EiBlock = ({ data }) => {
  const { setModal } = modalStore();
  const [hide, setHide] = useState(true);
  const [chk, setChk] = useState(data.is_completed);
  const { isViewDateTime } = userStore();

  useDidMountEffect(() => {
    putChk();
  }, [chk]);

  const putChk = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY}tasks/${data.id}/checked`,
        { is_checked: chk },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const deleteEiBlock = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`${process.env.REACT_APP_PROXY}tasks/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const detailEiBlock = (e, id) => {
    e.stopPropagation();
    setModal(<DetailModal id={id} />);
  };

  return (
    data && (
      <div
        role="button"
        tabIndex={0}
        className="ei-block-container"
        onClick={(e) => detailEiBlock(e, data.id)}
        onMouseEnter={() => {
          setHide(false);
        }}
        onMouseLeave={() => {
          setHide(true);
        }}
      >
        <div className="ei-block-info">
          <h2 className="ei-block-title">{data.title}</h2>
          <p className="ei-block-description">{data.description}</p>
          {isViewDateTime && (
            <>
              <p className="ei-block-end_at">
                {data.end_at == null ? "" : `${moment(data.end_at).format("YYYY. MM. DD ")}`}
              </p>
              <p className="ei-block-end_at">
                {data.is_time_include &&
                  `${new Date(data.end_at).getHours() >= 12 ? "오후" : "오전"}  ${moment(data.end_at).format(
                    " hh:mm",
                  )}`}
              </p>
            </>
          )}
        </div>
        <div className="ei-block-Icon">
          {hide ? (
            <div> </div>
          ) : (
            <button type="button" onClick={(e) => deleteEiBlock(e, data.id)}>
              <img src={EiX} alt="삭제" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setChk(!chk);
            }}
          >
            <img src={chk ? CheckOn : CheckOff} alt="check" />
          </button>
        </div>
      </div>
    )
  );
};

export default EiBlock;
