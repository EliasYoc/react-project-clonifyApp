import "./Avatar.css";

const Avatar = ({ srcAvatar, altAvatar, avatarName }) => {
  return (
    <div className="avatar">
      <img className="avatar__img" src={srcAvatar} alt={altAvatar} />
      <p className="avatar__name">{avatarName}</p>
    </div>
  );
};

export default Avatar;
