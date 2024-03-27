import "./SearchUser.sass";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import SingleUserSearched from "../singleUserSearched/SingleUserSearched";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import LoadingSvg from "../../assets/svg/loader.svg";
import { Link } from "react-router-dom";

interface UsersSearchedProps {
  _id: string;
  name: string;
  email: string;
  isFollowing: boolean;
  userPicture?: string;
}

interface SearchUserProps {
  closeSearch: () => void;
}

const SearchUser = ({ closeSearch }: SearchUserProps) => {
  const [usersSearched, setUsersSearched] = useState<UsersSearchedProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const response = await api.get(`/user-search/?name=${searchInput}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsersSearched(response.data.users);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (_id: string) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      await api.put(`/user-search/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (_id: string) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      await api.delete(`/remove-friend/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="search-user">
      <nav className="user-nav-top">
        <div className="userPhoto">
          <img src={DefaultGIFs[14].image} alt="user photo" />
        </div>
        <h1>Users</h1>
        <input
          type="text"
          placeholder={"Search user..."}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </nav>
      <section className="users">
        {isLoading ? (
          <div className="loading">
            <img src={LoadingSvg} alt="loading svg" />
          </div>
        ) : (
          usersSearched.map((user) => (
            <div className="single-user">
              <Link
                className="link-to-users-tasks"
                to={`/friend-tasks/${user._id}`}
                onClick={closeSearch}
              >
                <SingleUserSearched
                  key={user._id}
                  image={
                    DefaultGIFs[Math.floor(Math.random() * DefaultGIFs.length)]
                      .image
                  }
                  name={user.name}
                  email={user.email}
                />
              </Link>
              <SingleUserSearched
                follow={user.isFollowing}
                addFriend={() => handleFollow(user._id)}
                removeFriend={() => handleUnfollow(user._id)}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default SearchUser;
