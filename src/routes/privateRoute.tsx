import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  let user = false;
  const token = localStorage.getItem("jwtToken");

  if (token) {
    user = true;
  }
  return user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
