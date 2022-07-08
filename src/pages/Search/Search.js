import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesSkeleton from "../../components/CategoriesSkeleton/CategoriesSkeleton";
import GridList from "../../components/GridContainer/components/GridList";
import GridContainer from "../../components/GridContainer/GridContainer";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../features/authSpotifySlice";
import useMediaMinWidth720p from "../../hooks/useMediaMinWidth720p";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import CardCategory from "./components/CardCategory";
const Search = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaMinWidth720p();
  const { access_token } = useSelector(selectRequestToken);

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetSpotifyDataQuery("browse/categories");
  console.log(data);

  useEffect(() => {
    // console.log("effect search error:", error?.status);
    if (isError) {
      alert("isError search");
      if (error?.status === 401) {
        alert("search need refresh");
        dispatch(setNeedRefreshToken(true));
      }
    }
  }, [dispatch, error?.status, isError]);
  useEffect(() => {
    //cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  console.log("renderizando Search");
  return (
    <>
      {isLoading && <CategoriesSkeleton itemsLength={isDesktop ? 12 : 4} />}
      {isSuccess && (
        <GridContainer title="Explorar">
          <GridList>
            {data.categories.items.map((category) => (
              <CardCategory
                key={category.id}
                img={category.icons[0].url}
                title={category.name}
              />
            ))}
          </GridList>
        </GridContainer>
      )}
      {isError && <p>{error.status}</p>}
    </>
  );
};

export default Search;
