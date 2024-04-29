import PhotoName from "../photo-name/PhotoName";
import "./SingleUserSearched.sass";
import { SingleUserProps } from "./SingleUserSearched_interfaces.";

const SingleUserSearched = (props: SingleUserProps) => {
  return (
    <article className="photo">
      {props.name && props.email && props.image && (
        <div>
          <PhotoName
            color="black"
            name={props.name}
            email={props.email}
            image={props.image}
          />
        </div>
      )}

      {props.addFriend &&
        props.removeFriend &&
        (!props.follow ? (
          <button className={`follow`} onClick={props.addFriend}>
            Follow
          </button>
        ) : (
          <button className={`remove`} onClick={props.removeFriend}>
            Unfollow
          </button>
        ))}
    </article>
  );
};

export default SingleUserSearched;
