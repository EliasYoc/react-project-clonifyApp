import FollowedArtists from "./components/FollowedArtists";
import FollowedPlaylists from "./components/FollowedPlaylists";
import ProfileTop from "./components/ProfileTop";
const Profile = () => {
  return (
    <>
      <ProfileTop />
      <FollowedArtists />
      <FollowedPlaylists />
    </>
  );
};

export default Profile;
