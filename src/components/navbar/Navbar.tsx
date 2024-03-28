import { useState } from "react";
import { Link } from "react-router-dom";

//icons
import Search from "../../assets/svg/Search.svg";
import Hamburguer from "../../assets/svg/hambuerger-menu.svg";
import CloseIcon from "../../assets/svg/Vectorx-mark-black.svg";
// style
import "./Navbar.sass";
//components
import Aside from "../aside-menu/Aside";
import SearchUser from "../search_user/SearchUser";

const Navbar = () => {
  const [asideMenu, setAsideMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);

  const handleShowAside = () => {
    setAsideMenu(true);
  };

  const handleCloseBtn = () => {
    setAsideMenu(false);
    setSearchMenu(false);
  };

  const handleCloseSearch = () => {
    setSearchMenu(false);
  };

  const handleShowSearch = () => {
    setSearchMenu(!searchMenu);
  };
  return (
    <>
      <nav className="nav">
        <Link className="title" to="/">
          TODOLIST
        </Link>
        <ul className="icons">
          <li className="button-li">
            <img
              className="img"
              src={!searchMenu ? Search : CloseIcon}
              alt="search icon"
              onClick={handleShowSearch}
            />
          </li>
          <li className="button-li">
            <img
              className="img"
              src={Hamburguer}
              alt="hamburguer icon"
              onClick={handleShowAside}
            />
          </li>
        </ul>
      </nav>
      <aside className="aside-container">
        <div className="overerlay-aside">
          <div className={`aside ${asideMenu ? "aside-on" : "aside-off"}`}>
            <Aside closeBtn={handleCloseBtn} closeOnLink={handleCloseBtn} />
          </div>
        </div>
      </aside>

      <section className="overlay-section">
        <div
          className={`search-main ${
            searchMenu ? "search-main-on" : "search-main-off"
          }`}
        >
          <SearchUser closeSearch={handleCloseSearch} />
        </div>
      </section>
    </>
  );
};

export default Navbar;
