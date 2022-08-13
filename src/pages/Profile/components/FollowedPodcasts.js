import { useEffect } from "react";
import { useSelector } from "react-redux";
import CardUser from "../../../components/CardUser/CardUser";
import GridList from "../../../components/GridContainer/components/GridList";
import GridContainer from "../../../components/GridContainer/GridContainer";
import UsersSkeleton from "../../../components/UsersSkeleton/UsersSkeleton";
import { selectRequestToken } from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";

const FollowedPodcasts = () => {
  const { access_token } = useSelector(selectRequestToken);

  const {
    data: artists,
    isLoading,
    isError: playlistIsError,
    isSuccess: PlayListIsSuccess,
    error: playlistError,
    refetch,
  } = useGetSpotifyDataQuery("me/following/?type=artist");
  //
  if (playlistIsError) {
    console.log(playlistError);
  }
  console.log(artists);
  useEffect(() => {
    if (playlistIsError) {
      console.warn("error playlist", playlistError);
    }
  }, [playlistIsError, playlistError]);
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  if (isLoading) return <UsersSkeleton itemsLength={2} />;
  if (playlistIsError) return <p>an error has occurred</p>;
  return (
    PlayListIsSuccess &&
    artists.artists.items.length > 0 && (
      <GridContainer title="Seguidos">
        <GridList>
          {artists.artists.items.map((artist) => (
            <CardUser
              key={artist.id}
              title={artist.name}
              urlImg={artist.images[1].url}
              altImg={artist.name}
              anyInfo={artist.type}
            ></CardUser>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default FollowedPodcasts;
