import { useParams } from "react-router-dom";
import UpperDetailsCover from "../../components/UpperDetailsCover/UpperDetailsCover";
import { useGetSpotifyDataQuery } from "../../services/spotify";
import { millisecondsToMinute } from "../../utils/readOnlyLayout";
import "./Album.css";
import AlbumTracks from "./components/AlbumTracks";
const Album = () => {
  const { albumId } = useParams();
  const { data, isLoading, isError, error, isSuccess } = useGetSpotifyDataQuery(
    `albums/${albumId}`
  );
  let millisecondsTotal, totalTime;
  if (isSuccess) {
    millisecondsTotal = data?.tracks.items.reduce(
      (preVal, currentItem) => preVal + currentItem.duration_ms,
      0
    );
    totalTime = millisecondsToMinute(millisecondsTotal);
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Is error</p>;
  return (
    <div className="album-page">
      <UpperDetailsCover
        publisher={data.artists[0].name}
        imgSrc={data.images[1].url}
        title={data.name}
        type={data.album_type}
        stringAditionalInfoList={[
          `${data.total_tracks} canciones`,
          new Date(data.release_date).getFullYear(),
        ]}
        howLongTimeSongs={`${totalTime.minutes} min ${totalTime.seconds} s`}
      />
      <div className="all-page-info">
        <AlbumTracks tracks={data?.tracks.items} />
      </div>
    </div>
  );
};

export default Album;
