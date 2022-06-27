import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumsSkeleton from "../../components/AlbumsSkeleton/AlbumsSkeleton";
import CardAlbum from "../../components/CardAlbum/CardAlbum";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(selectRequestToken);

  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useGetSpotifyDataQuery(`browse/new-releases?limit=8&offset=0`);
  let content;
  // const {
  //   data: albums,
  //   isLoading: albumsLoading,
  //   isError: albumsIsError,
  //   isSuccess: albumsSuccess,
  //   error: albumsError,
  // } = useGetSpotifyDataQuery("me/albums?limit=4&offset=0");
  useEffect(() => {
    console.log("effect");
    if (error?.status === 401) {
      console.log("necesita refrescar token");
      dispatch(setNeedRefreshToken(true));
      // me daba loops infinitos
    }
  }, [dispatch, error?.status]);
  if (isError) {
    console.log(error);
    // error might have error.error (fetch error) or error.data ( data error)
    //investigar que cuando error.data.error.status === 401 entonces refreshToken
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
      <section className="albums">
        <h2 className="albums__title">Releases </h2>
        {isLoading ? (
          <AlbumsSkeleton itemsLength={8} />
        ) : (
          <div className="albums__list">
            {content}
            {isSuccess &&
              data.albums.items.map((release) => (
                <CardAlbum
                  urlImg={release.images[1].url}
                  altImg={release.name}
                  title={release.name}
                  key={release.id}
                />
              ))}
            {isFetching ? <p>Fetching</p> : ""}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
