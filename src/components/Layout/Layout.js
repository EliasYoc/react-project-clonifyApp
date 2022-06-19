import "./Layout.css";
import { useEffect } from "react";
import { useSearchParams, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accessToken,
  selectNeedRefreshToken,
  selectRequestToken,
  setNeedRefreshToken,
} from "../../features/authSpotifySlice";
import BgApp from "../../BgApp";
import Aside from "../Layout/components/Aside";
import HeaderMain from "../Layout/components/HeaderMain";
const reqToken = JSON.parse(sessionStorage.getItem("clonify-req-token"));

const Layout = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const needRefresh = useSelector(selectNeedRefreshToken);
  const tokenInfo = useSelector(selectRequestToken);
  useEffect(
    function exchangeCodeForToken() {
      const code = searchParams.get("code");
      if (code) {
        console.log("code");
        dispatch(
          accessToken({
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams({
              //lo tengo que enviar urlencode
              code,
              grant_type: "authorization_code",
              redirect_uri: process.env.REACT_APP_REDIRECT_URI,
              client_id: process.env.REACT_APP_CLIENT_ID,
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
            }),
          })
        );
      }
    },
    [searchParams, dispatch]
  );
  useEffect(
    function refreshToken() {
      if (needRefresh) {
        console.warn("necesita refrescar el token " + needRefresh);

        dispatch(
          accessToken({
            method: "POST",
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: tokenInfo.refresh_token,
              redirect_uri: process.env.REACT_APP_REDIRECT_URI,
              client_id: process.env.REACT_APP_CLIENT_ID,
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
            }),
          })
        );
        dispatch(setNeedRefreshToken(false));
        alert("alto");
      }
      // console.warn("refresh fals: " + needRefresh);
    },
    [dispatch, needRefresh, tokenInfo.refresh_token]
  );
  // useEffect(() => {
  //   const storePath = localStorage.getItem("path-clonify");
  //   navigate(storePath);
  // }, [navigate]);

  return (
    <div className="container-app">
      <BgApp />
      <Aside />
      <main className="container-app__main">
        <HeaderMain />
        <div className="background">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
