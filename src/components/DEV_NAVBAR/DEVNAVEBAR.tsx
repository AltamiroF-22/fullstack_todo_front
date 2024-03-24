import { Link } from "react-router-dom";
import './sass.sass'

const DEVNAVBAR = () => {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/">Tasks</Link>
    </nav>
  );
};



export default DEVNAVBAR