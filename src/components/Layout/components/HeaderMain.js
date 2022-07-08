import { useEffect, React, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { setNeedRefreshToken } from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";
import Avatar from "./Avatar";
import "./HeaderMain.css";

const HeaderMain = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {
    data: me,
    isLoading: meLoading,
    isError: meIsError,
    isSuccess: meSuccess,
    error: meError,
  } = useGetSpotifyDataQuery("me");

  useEffect(() => {
    if (meIsError) {
      console.log(meError);
      if (meError.data?.error.status === 401) {
        console.log("Avatar error need refresh");
        dispatch(setNeedRefreshToken(true));
      }
    }
  }, [dispatch, meError, meIsError]);

  return (
    <header ref={ref} className="main-header">
      <div className="main-header__left"></div>
      {meLoading ? <p>Loading...</p> : ""}
      {meSuccess && (
        <Avatar
          srcAvatar={me?.images[0].url}
          altAvatar={me?.display_name}
          avatarName={me?.display_name}
        />
      )}
    </header>
  );
});

export default HeaderMain;
