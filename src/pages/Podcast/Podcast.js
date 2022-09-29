import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpperDetailsSkeleton from "../../components/UpperDetailsCover/components/UpperDetailsSkeleton";
import UpperDetailsCover from "../../components/UpperDetailsCover/UpperDetailsCover";
import {
  selectRequestToken,
  setNeedRefreshToken,
} from "../../features/authSpotifySlice";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import Episode from "./components/Episode";
import PodcastAside from "./components/PodcastAside";
import "./Podcast.css";

const Podcast = () => {
  const { access_token } = useSelector(selectRequestToken);
  const dispatch = useDispatch();
  const { showId } = useParams();
  const {
    data: show,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetSpotifyDataQuery(`shows/${showId}`);
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
  if (isLoading) return <UpperDetailsSkeleton hasType hasImg />;
  if (isError) return <p>Occur an error</p>;
  return (
    <>
      <UpperDetailsCover
        imgSrc={show.images[1].url}
        title={show.name}
        type="PODCAST"
        publisher={show.publisher}
      />
      <div className="show">
        <PodcastAside podcastDetails={show.html_description} />
        <div className="show__episodesContainer">
          <h3 className="show__listTitle">Episodios</h3>
          <div className="show__episodes">
            {show.episodes.items.map((episode, i) => (
              <Episode
                key={episode.id}
                publisher={show.publisher}
                imageSrc={episode.images[2].url}
                espisodeTitle={episode.name}
                episodeDescription={episode.description}
                delayAnimationSeconds={100 + i * 50}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcast;
