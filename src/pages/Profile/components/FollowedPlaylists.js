import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumsSkeleton from "../../../components/AlbumsSkeleton/AlbumsSkeleton";
import CardSquare from "../../../components/CardSquare/CardSquare";
import GridList from "../../../components/GridContainer/components/GridList";
import GridContainer from "../../../components/GridContainer/GridContainer";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";

const FollowedPlaylists = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const {
    data: playlists,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetSpotifyDataQuery("me/playlists");
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
    console.log("followed playlist");
  }, [access_token, refetch]);
  useEffect(() => {
    if (isError && error.data?.error.status === 401) {
      dispatch(setNeedRefreshToken(true));
    }
    if (isError) {
      console.warn("error playlist", error);
    }
  }, [dispatch, isError, error]);
  if (isLoading) return <AlbumsSkeleton itemsLength={3} />;
  if (isError) return <p>An error has occurred</p>;

  return (
    playlists.items.length > 0 && (
      <GridContainer title="Playlists seguidos">
        <GridList>
          {playlists.items.map((playlist) => (
            <CardSquare
              key={playlist.id}
              title={playlist.name}
              urlImg={playlist.images[0].url}
              altImg={playlist.name}
              anyInfo={playlist.description}
              id={playlist.id}
              type={playlist.type}
            ></CardSquare>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default FollowedPlaylists;
