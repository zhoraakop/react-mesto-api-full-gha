import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user, onlyUnAuth, isRegister }) => {
  if (!onlyUnAuth && !user) {
    return <Navigate to={{ pathname: "/signin" }} />;
  }

  if (onlyUnAuth && user && isRegister) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  if (onlyUnAuth && user && !isRegister) {
    return children;
  }
  return children;
};

export default ProtectedRoute;
