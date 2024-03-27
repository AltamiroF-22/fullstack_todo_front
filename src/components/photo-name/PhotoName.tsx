import "./PhotoName.sass";

interface UserImageProps {
  image: string;
  name: string;
  email: string;
  color?: string;
}

const PhotoName = ({ image, name, email, color }: UserImageProps) => {
  let userName = name;
  let userEmail = email;

  if (name.length > 15) {
    userName = name.slice(0, 15) + "...";
  }
  if (email.length > 20) {
    userEmail = email.slice(0, 20) + "...";
  }
  return (
    <figure className="profile">
      <img className="profile-photo" src={image} alt="profile picture"></img>
      <div className={`data ${color === "black" ? "black" : ""}`}>
        <figcaption>{userName}</figcaption>
        <figcaption className="small">{userEmail}</figcaption>
      </div>
    </figure>
  );
};

export default PhotoName;
