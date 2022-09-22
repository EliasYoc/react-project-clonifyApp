import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCircle from "../../../components/CardCircle/CardCircle";
import GridList from "../../../components/GridContainer/components/GridList";
import GridContainer from "../../../components/GridContainer/GridContainer";
import UsersSkeleton from "../../../components/UsersSkeleton/UsersSkeleton";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";

const FollowedArtists = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const {
    data: artists,
    isLoading,
    isError: followedIsError,
    error: followedError,
    refetch,
  } = useGetSpotifyDataQuery("me/following/?type=artist");
  //

  useEffect(() => {
    if (followedIsError && followedError.data?.error.status === 401) {
      dispatch(setNeedRefreshToken(true));
    }
    if (followedIsError) {
      console.warn("error playlist", followedError);
    }
  }, [dispatch, followedIsError, followedError]);
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  if (isLoading) return <UsersSkeleton itemsLength={2} />;
  if (followedIsError) return <p>an error has occurred</p>;
  return (
    artists.artists.items.length > 0 && (
      <GridContainer title="Seguidos">
        <GridList>
          {artists.artists.items.map((artist) => (
            <CardCircle
              key={artist.id}
              title={artist.name}
              urlImg={artist.images[1].url}
              altImg={artist.name}
              anyInfo={artist.type}
              id={artist.id}
              type={artist.type}
            ></CardCircle>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default FollowedArtists;
