import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import DefaultImage from "../../assets/images/default_img.webp";
import PhotoName from "../photo-name/PhotoName";
import "./Aside.sass";

interface UserDataProps {
  _id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  profilePicture?: string;
}

interface UserFriendsProps {
  _id: string;
  name: string;
  profilePicture: string;
  email: string;
}

interface ButtonProps {
  CloseBtn: () => void;
}
const initialUserData: UserDataProps = {
  _id: "",
  name: "",
  email: "",
  password: "",
  friends: [],
  profilePicture: DefaultImage,
};

const Aside = ({ CloseBtn }: ButtonProps) => {
  const [userData, setUserData] = useState<UserDataProps>(initialUserData);
  const [userFriends, setUserFriends] = useState<UserFriendsProps[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    loadUserData();
    loadUserFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;
      setUserData(userData);
      setUserId(userData._id);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const loadUserFriends = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await api.get(`user-friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserFriends(response.data.friends);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  return (
    <aside className="aside">
      <section className="top">
        {/* {userData.profilePicture ? (
          <PhotoName name={userData.name} image={userData.profilePicture} />
        ) : (
          <PhotoName name={userData.name} image={DefaultImage} />
        )} */}
        <PhotoName
          name={userData.name}
          email={userData.email}
          image={
            DefaultGIFs[Math.floor(Math.random() * DefaultGIFs.length)].image
          }
        />
        <button className="close-aside" onClick={CloseBtn}>
          close
        </button>
      </section>

      <section className="file-upload">
        <label className="file-upload-label">
          {/*htmlFor="file-input"*/}
          New Profile Picture
        </label>
        <input id="file-input" className="file-input" type="file" />
      </section>

      <section className="friends-sec">
        <h2>Friends</h2>
        <div className="friends">
          {userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <PhotoName
                key={friend._id}
                // image={friend.profilePicture ? friend.profilePicture : DefaultImage}
                image={
                  DefaultGIFs[Math.floor(Math.random() * DefaultGIFs.length)]
                    .image
                }
                name={friend.name}
                email={friend.email}
              />
            ))
          ) : (
            <p className="no-f-msg">No friends found :/</p>
          )}
        </div>
      </section>
    </aside>
  );
};
export default Aside;
