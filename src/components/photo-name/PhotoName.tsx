import "./PhotoName.sass";
import { UserImageProps } from "./PhotoName_interface";

const PhotoName = (props: UserImageProps) => {
  let userName = props.name;
  let userEmail = props.email;

  if (props.name.length > 15) {
    userName = props.name.slice(0, 15) + "...";
  }
  
  if (props.email.length > 20) {
    userEmail = props.email.slice(0, 20) + "...";
  }
  return (
    <figure className="profile">
      <img
        className="profile-photo"
        src={props.image}
        alt="profile picture"
      ></img>
      <div className={`data ${props.color === "black" ? "black" : ""}`}>
        <figcaption>{userName}</figcaption>
        <figcaption className="small">{userEmail}</figcaption>
      </div>
    </figure>
  );
};

export default PhotoName;
