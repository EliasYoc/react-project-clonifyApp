import { useState } from "react";
import "./Avatar.css";
import AvatarOptions from "./AvatarOptions";

const Avatar = ({ srcAvatar, altAvatar, avatarName }) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div onClick={handleClick} className="avatar">
      <img className="avatar__img" src={srcAvatar} alt={altAvatar} />
      <p className="avatar__name">{avatarName}</p>
      {showOptions && <div className="avatar-backdrop"></div>}
      <AvatarOptions className={!showOptions ? "hide-box" : ""} />
    </div>
  );
};

export default Avatar;
