import "../styles/components/Avatar.css";

const Avatar = ({ imgSrc, username, dimensions }) => {
  return (
    username && (
      <div className="avatar-container" style={{ width: dimensions, height: dimensions, fontSize: dimensions }}>
        {imgSrc && imgSrc !== " " ? (
          <img src={imgSrc} alt=" " />
        ) : (
          <p>{username.substring(0, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(username[0]) ? 1 : 2)}</p>
        )}
      </div>
    )
  );
};

export default Avatar;
