import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.authentication.isAuthenticated); //uses the redux store to get the user, isAuthenticated is the slice name in the store
  let location = useLocation();
  console.log({ auth });
  if (auth) return children; // if the user is logged in, return the children
  else return <Navigate to="/" state={{ from: location }} replace />; // if the user is not logged in, redirect to the login page
};
export default RequireAuth;
