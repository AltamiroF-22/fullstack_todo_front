import "./PhotoName.sass";

interface UserImageProps {
  image: string;
  name: string;
  email?: string;
  color?: string

}

const PhotoName = ({ image, name,email, color }: UserImageProps) => {
  let username = name;

  if (name?.length > 15) {
    username = name.slice(0, 15) + "...";
  }
  return (
    <figure className="profile" >
      <img className="profile-photo" src={image} alt="profile picture"></img>
      <div className={`data ${color === 'black' ? 'black' : ''}`}>
        <figcaption>{username}</figcaption>
        <figcaption className="small">{email}</figcaption>
      </div>
    </figure>
  );
};

export default PhotoName;
