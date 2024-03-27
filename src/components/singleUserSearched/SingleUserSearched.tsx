import PhotoName from "../photo-name/PhotoName";
import "./SingleUserSearched.sass";

interface SingleUserProps {
  follow?: boolean;
  name?: string;
  email?: string;
  image?: string;
  addFriend?: () => void;
  removeFriend?: () => void;
}

const SingleUserSearched = ({
  follow,
  name,
  email,
  image,
  addFriend,
  removeFriend,
}: SingleUserProps) => {
  return (
    <article className="photo">
      {name && email && image && (
        <div>
          <PhotoName color="black" name={name} email={email} image={image} />
        </div>
      )}

      {addFriend &&
        removeFriend &&
        (!follow ? (
          <button className={`follow`} onClick={addFriend}>
            Follow
          </button>
        ) : (
          <button className={`remove`} onClick={removeFriend}>
            Unfollow
          </button>
        ))}
    </article>
  );
};

export default SingleUserSearched;
