import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../../features/authSpotifySlice";
import { selectRandomRgb } from "../../../features/themesSlice";
import { useGetSpotifyDataQuery } from "../../../services/spotify";
import PopularAudio from "./PopularAudio";

const PopularList = () => {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const { access_token } = useSelector(selectRequestToken);
  const rgbColor = useSelector(selectRandomRgb);
  const { data: markets, isSuccess: isSuccessMarket } =
    useGetSpotifyDataQuery("markets");
  const { region: codeRegion } = new Intl.Locale(navigator.language);
  let marketCode = "US";
  if (isSuccessMarket) {
    let marketIndex = markets.markets.indexOf(codeRegion || "US");
    marketCode = markets.markets[marketIndex];
  }

  const { data, isLoading, isError, error, refetch } = useGetSpotifyDataQuery(
    `artists/${artistId}/top-tracks?market=${marketCode}`
  );
  useEffect(() => {
    //manera correcta
    if (isError && error.data?.error.status === 401) {
      console.error("Avatar error need refresh");
      dispatch(setNeedRefreshToken(true));
    }
  }, [dispatch, error?.data?.error.status, isError]);
  useEffect(() => {
    //la primera vez o cuando cambie el token que se refrescó, hará refetch
    if (access_token) refetch();
  }, [access_token, refetch]);

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>Occur an error</p>;
  return (
    <section
      style={{
        background: `linear-gradient(rgb(${rgbColor},.7)5%, transparent 12%)`,
      }}
      className="topList"
    >
      <h2 className="topList__title">Popular</h2>
      <ol className="topList__container">
        {data.tracks.map((popular, i) => (
          <PopularAudio key={i} i={i} popular={popular} />
        ))}
      </ol>
    </section>
  );
};

export default PopularList;
