import { useGetSpotifyDataQuery } from "../../../services/spotify";
import "./ProfileTop.css";
const ProfileTop = () => {
  const { data, isLoading, isError, isSuccess, error } =
    useGetSpotifyDataQuery("me");
  console.log(data);
  // if(error.status === 401) return
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <section className="cover">
          <div className="cover__wrap-img">
            <img
              className="cover__img"
              src={data.images[0].url}
              alt={data.display_name}
            />
          </div>
          <div className="cover__info">
            <p>Perfil</p>
            <h1>{data.display_name}</h1>
            <span className="cover__followers">
              {data.followers.total} Seguidores
            </span>
          </div>
        </section>
      )}
      {isError && <p>{error.state}</p>}
    </>
  );
};

export default ProfileTop;
