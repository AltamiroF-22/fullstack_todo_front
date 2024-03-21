import "./PhotoName.sass";

interface UserImageProps {
  image: string;
  name: string;
  email?: string;
  key?: string | number;
}

const PhotoName = ({ image, name, key, email }: UserImageProps) => {
  let username = name;

  if (name?.length > 15) {
    username = name.slice(0, 15) + "...";
  }
  return (
    <figure className="profile" key={key}>
      <img className="profile-photo" src={image} alt="profile picture"></img>
      <div className="data">
        <figcaption>{username}</figcaption>
        <figcaption className="small">{email}</figcaption>
      </div>
    </figure>
  );
};

export default PhotoName;
