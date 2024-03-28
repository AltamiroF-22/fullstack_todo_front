import Navbar from "../../components/navbar/Navbar";
import UserTasks from "../../components/UserTasks/UserTasks";
// import { useNavigate } from "react-router-dom";

import "./Homer.sass";
const Home = () => {
  return (
    <>
      <Navbar />
      <UserTasks />
    </>
  );
};

export default Home;
