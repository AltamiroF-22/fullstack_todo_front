import "./SearchUser.sass";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import SingleUserSearched from "../singleUserSearched/SingleUserSearched";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import LoadingSvg from "../../assets/svg/loader.svg";
import { Link } from "react-router-dom";
import { SearchUserProps, UsersSearchedProps } from "./SearchUser_Interface";

const SearchUser = ({ closeSearch }: SearchUserProps) => {
  const [usersSearched, setUsersSearched] = useState<UsersSearchedProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await api.get(`/user-search/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const toLowerCaseUsers = response.data.users.map(
        (user: UsersSearchedProps) => ({
          ...user,
          name: user.name.toLowerCase(),
        })
      );
      setUsersSearched(toLowerCaseUsers);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // search for users in the fron to avoid useless requisitions to my api
  const filteredUsers = usersSearched.filter((user) =>
    user.name.startsWith(searchInput)
  );

  const handleFollow = async (_id: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
      </nav>
      <section className="users">
        {isLoading ? (
          <div className="loading">
            <img src={LoadingSvg} alt="loading svg" />
          </div>
        ) : (
          filteredUsers.map((user) => (
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
