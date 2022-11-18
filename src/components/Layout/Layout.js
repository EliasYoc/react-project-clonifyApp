import "./Layout.css";
import { useEffect, useRef } from "react";
import { useSearchParams, Outlet } from "react-router-dom";
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
import PrincipalButtons from "../PrincipalButtons/PrincipalButtons";
import useMediaMinWidth720p from "../../hooks/useMediaMinWidth720p";
import {
  resetElementTransition,
  selectElementTransition,
} from "../../features/themesSlice";

const Layout = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const needRefresh = useSelector(selectNeedRefreshToken);
  const tokenInfo = useSelector(selectRequestToken);
  const isDesktop = useMediaMinWidth720p();
  const refMain = useRef();
  const refHeader = useRef();
  useEffect(
    function exchangeCodeForToken() {
      const code = searchParams.get("code");
      if (code) {
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
  useEffect(() => {
    refMain.current.addEventListener("scroll", (e) => {
      e.target.scrollTop > 50
        ? refHeader.current.classList.add("setColor")
        : refHeader.current.classList.remove("setColor");
    });
  }, []);
  const { outgoingElementBounding, incomingElementBounding } = useSelector(
    selectElementTransition
  );
  const refIncomingElement = useRef();
  useEffect(
    function animateIncomingImage() {
      if (outgoingElementBounding && incomingElementBounding) {
        const anim = refIncomingElement.current.animate(
          [
            {
              zIndex: 10,
              position: "absolute",
              height: `${outgoingElementBounding?.height}px`,
              width: `${outgoingElementBounding?.width}px`,
              left: `${outgoingElementBounding?.x}px`,
              top: `${outgoingElementBounding?.y}px`,
            },
            {
              zIndex: 10,
              position: "absolute",
              height: `${incomingElementBounding?.height}px`,
              width: `${incomingElementBounding?.width}px`,
              left: `${incomingElementBounding?.x}px`,
              top: `${incomingElementBounding?.y}px`,
            },
          ],
          {
            duration: 800,
            easing: "ease",
            // fillMode: "forwards",
          }
        );
        console.log(anim);
      }
    },
    [outgoingElementBounding, incomingElementBounding]
  );
  useEffect(
    function restartElementTransition() {
      if (isDesktop || !isDesktop) {
        dispatch(resetElementTransition());
      }
    },
    [isDesktop, dispatch]
  );
  return (
    <div className="container-app">
      <BgApp />
      {isDesktop && <Aside />}
      <main ref={refMain} className="container-app__main">
        <div className="background">
          <HeaderMain ref={refHeader} />
          {outgoingElementBounding && (
            <div
              style={{
                backgroundImage: `url(${outgoingElementBounding?.src})`,
                backgroundSize: "cover",
              }}
              ref={refIncomingElement}
            ></div>
          )}
          <Outlet />
        </div>
        {!isDesktop && <PrincipalButtons />}
      </main>
    </div>
  );
};

export default Layout;
