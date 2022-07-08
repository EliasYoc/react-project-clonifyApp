import { useEffect } from "react";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import ProfileTop from "./components/ProfileTop";
const Profile = () => {
  const {
    data: playlistData,
    isLoading: playlistIsLoading,
    isError: playlistIsError,
    isSuccess: PlayListIsSuccess,
    error: playlistError,
  } = useGetSpotifyDataQuery("me/following/?type=artist");
  //
  console.log(playlistData);
  // useEffect(() => {
  //   if (isError) {
  //     console.warn("error", error);
  //   }
  // }, [isError, error]);
  return (
    <>
      <ProfileTop />
    </>
  );
};

export default Profile;
