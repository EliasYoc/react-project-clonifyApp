import FollowedPodcasts from "./components/FollowedPodcasts";
import FollowedPlaylists from "./components/FollowedPlaylists";
import ProfileTop from "./components/ProfileTop";
const Profile = () => {
  return (
    <>
      <ProfileTop />
      <FollowedPodcasts />
      <FollowedPlaylists />
    </>
  );
};

export default Profile;
