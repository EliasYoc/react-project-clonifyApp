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

const LibraryAlbums = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const { data, isLoading, isError, error, refetch } =
    useGetSpotifyDataQuery("me/albums");
  useEffect(() => {
    //manera correcta
    if (isError && error.data?.error.status === 401) {
      console.log("Avatar error need refresh");
      dispatch(setNeedRefreshToken(true));
    }
  }, [dispatch, error?.data?.error.status, isError]);
  useEffect(() => {
    //la primera vez o cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  if (isLoading) return <UsersSkeleton itemsLength={2} />;
  if (isError)
    return <p> an error has occurred ${error.data?.error.status || ""}</p>;

  return (
    <GridContainer title="Albumes">
      <GridList>
        {data.items.map((album) => (
          <CardCircle
            key={album.album.id}
            id={album.album.id}
            type={album.album.type}
            title={album.album.name}
            urlImg={album.album.images[1].url}
            altImg={album.album.name}
            anyInfo={album.album.type}
          ></CardCircle>
        ))}
      </GridList>
    </GridContainer>
  );
};

export default LibraryAlbums;
