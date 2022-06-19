import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../features/authSpotifySlice";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectAuth);
  return isAuth ? <Navigate to="/" replace={true} /> : children;
};

export default PublicRoute;
