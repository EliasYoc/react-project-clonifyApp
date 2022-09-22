import React, { useEffect } from "react";
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

const LibraryArtists = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const {
    data: artists,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetSpotifyDataQuery("me/following/?type=artist");
  useEffect(() => {
    //manera correcta
    if (isError && error.data?.error.status === 401) {
      console.log("Avatar error need refresh");
      dispatch(setNeedRefreshToken(true));
    }
  }, [dispatch, error?.data?.error.status, isError]);
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  if (isLoading) return <UsersSkeleton itemsLength={2} />;
  if (isError)
    return <p>an error has occurred ${error.data?.error.status || ""}</p>;

  return (
    artists.artists.items.length > 0 && (
      <GridContainer title="Artistas">
        <GridList>
          {artists.artists.items.map((artist) => (
            <CardCircle
              key={artist.id}
              id={artist.id}
              type={artist.type}
              title={artist.name}
              urlImg={artist.images[1].url}
              altImg={artist.name}
              anyInfo={artist.type}
            ></CardCircle>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default LibraryArtists;
