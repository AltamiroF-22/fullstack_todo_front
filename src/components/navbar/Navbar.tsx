import { useState } from "react";
//icons
import Search from "../../assets/svg/Search.svg";
import Hamburguer from "../../assets/svg/hambuerger-menu.svg";
import CloseIcon from '../../assets/svg/Vectorx-mark-black.svg'
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
  };

  const handleShowSearch = () => {
    setSearchMenu(!searchMenu);
  };

  return (
    <>
      <nav className="nav">
        <h1 className="title">TODOLIST</h1>
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
      {asideMenu && <Aside CloseBtn={handleCloseBtn} />}
      {searchMenu&& <SearchUser/>}
    </>
  );
};

export default Navbar;
