import { useEffect } from "react";
import { useSelector } from "react-redux";
import AlbumsSkeleton from "../../components/AlbumsSkeleton/AlbumsSkeleton";
import CardAlbum from "../../components/CardAlbum/CardAlbum";
import GridList from "../../components/GridContainer/components/GridList";
import GridContainer from "../../components/GridContainer/GridContainer";
import {
  selectRequestToken,
  // setNeedRefreshToken,
} from "../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../services/spotify";

const Home = () => {
  // const dispatch = useDispatch();
  const { access_token } = useSelector(selectRequestToken);
  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useGetSpotifyDataQuery(`browse/new-releases?limit=8&offset=0`);
  let content;

  // const { mySpotifyId } = useGetSpotifyDataQuery("me", {
  //   selectFromResult: ({ data }) => ({ mySpotifyId: data?.id }),
  // });
  // const {
  //   data: albums,
  //   isLoading: albumsLoading,
  //   isError: albumsIsError,
  //   isSuccess: albumsSuccess,
  //   error: albumsError,
  // } = useGetSpotifyDataQuery("me/albums?limit=4&offset=0");

  // useEffect(() => { este useeffect por refetch
  //   if (isError) {
  //     if (error?.status === 401) {
  //       alert("necesita refrescar token home");
  //       dispatch(setNeedRefreshToken(true));
  //       // me daba loops infinitos fuera del effect
  //     }
  //   }
  // }, [dispatch, error?.status, isError]);
  if (isError) {
    console.log(error);
    // error might have error.error (fetch error) or error.data ( data error)
    //investigar que cuando error.data.error.status === 401 entonces refreshToken (creo que la solucion si el token cambia usar refresh)
    content = error.data ? (
      <p>{error.data?.error.message}</p>
    ) : (
      <p>{error.error}</p>
    );
  }

  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  return (
    <>
      {isLoading && <AlbumsSkeleton itemsLength={8} />}
      {isSuccess && (
        <GridContainer title="Releases">
          <GridList>
            {data.albums.items.map((release) => (
              <CardAlbum
                urlImg={release.images[1].url}
                altImg={release.name}
                title={release.name}
                anyInfo={release.album_type}
                key={release.id}
              />
            ))}
            {isFetching ? <p>Fetching</p> : ""}
          </GridList>
        </GridContainer>
      )}
      {isError && content}
    </>
  );
};

export default Home;
