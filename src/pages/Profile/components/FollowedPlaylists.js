import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AlbumsSkeleton from "../../../components/AlbumsSkeleton/AlbumsSkeleton";
import CardAlbum from "../../../components/CardAlbum/CardAlbum";
import GridList from "../../../components/GridContainer/components/GridList";
import GridContainer from "../../../components/GridContainer/GridContainer";
import { selectRequestToken } from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";

const FollowedPlaylists = () => {
  const { access_token } = useSelector(selectRequestToken);

  const {
    data: playlists,
    isLoading,
    isError,
    isSuccess,
    refetch,
    error,
  } = useGetSpotifyDataQuery("me/playlists");
  console.log(playlists);
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  useEffect(() => {
    if (isError) {
      console.warn("error followed", error);
    }
  }, [isError, error]);
  if (isLoading) return <AlbumsSkeleton itemsLength={3} />;
  if (isError) return <p>An error has occurred</p>;

  return (
    isSuccess &&
    playlists.items.length > 0 && (
      <GridContainer title="Playlists seguidos">
        <GridList>
          {playlists.items.map((playlist) => (
            <CardAlbum
              key={playlist.id}
              title={playlist.name}
              urlImg={playlist.images[0].url}
              altImg={playlist.name}
              anyInfo={playlist.description}
            ></CardAlbum>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default FollowedPlaylists;
