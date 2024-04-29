import Navbar from "../../components/navbar/Navbar";
import UserTasks from "../../components/UserTasks/UserTasks";
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
