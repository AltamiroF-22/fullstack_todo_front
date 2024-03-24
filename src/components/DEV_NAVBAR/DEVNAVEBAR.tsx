import { Link } from "react-router-dom";
import "./sass.sass";

const DEVNAVBAR = () => {
  return (
    <>
      <nav className="test-nav">
        <h4>Nav de testes:</h4>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/">Tasks</Link>
      </nav>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default DEVNAVBAR;
