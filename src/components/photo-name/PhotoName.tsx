import "./PhotoName.sass";

interface UserImageProps {
  image: string;
  email?: string;
  name?: string;
  key?: string | number;
}

const PhotoName = ({ image, name, key, email }: UserImageProps) => {
  const username = name ? name.slice(0, 15) : "";
  return (
    <figure className="profile" key={key}>
      <img className="profile-photo" src={image} alt="profile picture"></img>
      <div className="data">
        <figcaption>{username + "..."}</figcaption>
        <figcaption className="small">{email}</figcaption>
      </div>
    </figure>
  );
};

export default PhotoName;