import { useEffect, React, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";
import Avatar from "./Avatar";
import "./HeaderMain.css";

const HeaderMain = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(selectRequestToken);

  const {
    data: me,
    isLoading: meLoading,
    isError: meIsError,
    isSuccess: meSuccess,
    error: meError,
    refetch,
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
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
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
