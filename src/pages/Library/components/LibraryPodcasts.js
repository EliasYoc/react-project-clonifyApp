import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSquare from "../../../components/CardSquare/CardSquare";
import GridList from "../../../components/GridContainer/components/GridList";
import GridContainer from "../../../components/GridContainer/GridContainer";
import UsersSkeleton from "../../../components/UsersSkeleton/UsersSkeleton";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";

const LibraryPodcasts = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const {
    data: shows,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetSpotifyDataQuery("me/shows");
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
    shows.items.length > 0 && (
      <GridContainer title="Podcasts">
        <GridList>
          {shows.items.map((show) => (
            <CardSquare
              key={show.show.id}
              id={show.show.id}
              title={show.show.name}
              urlImg={show.show.images[0].url}
              altImg={show.show.name}
              anyInfo={show.show.description}
              type={show.show.type}
            ></CardSquare>
          ))}
        </GridList>
      </GridContainer>
    )
  );
};

export default LibraryPodcasts;
