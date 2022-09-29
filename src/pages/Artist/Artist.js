import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import UpperDetailsSkeleton from "../../components/UpperDetailsCover/components/UpperDetailsSkeleton";
import PopularList from "./components/PopularList";
import UpperDetailsCover from "../../components/UpperDetailsCover/UpperDetailsCover";
import "./Artist.css";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../features/authSpotifySlice";
const Artist = () => {
  const { access_token } = useSelector(selectRequestToken);
  const { artistId } = useParams();
  const dispatch = useDispatch();
  const {
    data: upper,
    isLoading: upperIsLoading,
    isError: upperIsError,
    error: upperError,
    refetch,
  } = useGetSpotifyDataQuery(`artists/${artistId}`);

  const followers = new Intl.NumberFormat(navigator.language).format(
    upper?.followers.total
  );
  useEffect(() => {
    //manera correcta
    if (upperIsError && upperError.data?.error.status === 401) {
      console.error("Avatar error need refresh");
      dispatch(setNeedRefreshToken(true));
    }
  }, [dispatch, upperError?.data?.error.status, upperIsError]);
  useEffect(() => {
    //la primera vez o cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);
  return (
    <>
      {upperIsLoading ? (
        <UpperDetailsSkeleton hasImg hasType />
      ) : (
        <UpperDetailsCover
          title={upper.name}
          type={upper.type.toUpperCase()}
          imgSrc={upper.images[1].url}
          stringAditionalInfoList={[`${followers} followers`]}
        />
      )}
      {upperIsError && <p>Occur an error</p>}
      <PopularList />
    </>
  );
};

export default Artist;
