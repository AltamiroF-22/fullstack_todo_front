import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import PhotoName from "../photo-name/PhotoName";
import LoadingSvg from "../../assets/svg/whiteLoader.svg";
import {
  UserDataProps,
  CloseProps,
  UserFriendsProps,
  InitialUserData,
} from "./Aside_Interfaces";
import "./Aside.sass";

const Aside = ({ closeBtn, closeOnLink }: CloseProps) => {
  const [userData, setUserData] = useState<UserDataProps>(InitialUserData);
  const [userFriends, setUserFriends] = useState<UserFriendsProps[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    loadUserFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

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
      setIsLoading(false);
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
        <Link className="link-to-home" to={"/"} onClick={closeOnLink}>
          <PhotoName
            name={userData.name}
            email={userData.email}
            image={DefaultGIFs[14].image}
          />
        </Link>
        <button className="close-aside" onClick={closeBtn}>
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
        <h2>Followed by you.</h2>
        <div className="friends">
          {isLoading ? (
            <div className="loading-father">
              <img className="loading" src={LoadingSvg} alt="loading svg" />
            </div>
          ) : userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <Link
                className="link-to-friend-tasks"
                to={`/friend-tasks/${friend._id}`}
                onClick={closeOnLink}
              >
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
              </Link>
            ))
          ) : (
            <p className="no-f-msg">You aren't following nobody...</p>
          )}
        </div>
        <footer>
          <small> &copy; junior.rx22</small>
          <button className="logout" onClick={handleLogout}>
            logout
          </button>
        </footer>
      </section>
    </aside>
  );
};
export default Aside;
