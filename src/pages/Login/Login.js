import { RESPONSE_TYPE, scopeString } from "../../features/authSpotifySlice";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <h1>Clonify</h1>
      <a
        className="link-login"
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scopeString}`}
      >
        Login
      </a>
    </div>
  );
};

export default Login;
