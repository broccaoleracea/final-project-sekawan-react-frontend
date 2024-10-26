import MoviePoster from "../../Components/Cards/MoviePoster";
import TrendMovieFetcher from "../../Components/Fetchers/TrendingMovieFetcher";
import { useDispatch, useSelector } from "react-redux";
import PersonCard from "../../Components/Cards/PersonCard";
import axios from "axios";
import { setTop } from "../../Components/Store/Action/movieAction";
import { useEffect } from "react";

const Homepage = () => {
  const dispatch = useDispatch();

  const GetTopRated = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
        { headers }
      );
      console.log(response.data);
      dispatch(setTop(response.data));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const trend = useSelector((state) => state.trend.trend);
  const topRated = useSelector((state) => state.topRated.topRated);
  const loading = useSelector((state) => state.loading.loading);

  return (
    <div>
      {/* Hero Element */}
      <div className="hero max-h-96 h-full bg-base-900">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Nightflix</h1>
            <p className="mb-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              praesentium neque, molestias ducimus ex quidem quo cum ut cumque
              aperiam voluptatibus minima dignissimos soluta unde
              necessitatibus. Deserunt provident fugiat odit.
            </p>
          </div>
        </div>
      </div>

      {/* Trending section */}
      <div className="my-5">
        <h1 className="text-2xl font-black text-left px-4">On Trending : </h1>
        <div className="carousel carousel-center max-w-full  space-x-3 p-3">
          <TrendMovieFetcher />
          {(trend && trend?.length > 0
            ? trend
            : Array.from({ length: 10 })
          ).map((item, index) => (
            <div key={item?.id || index} className="carousel-item max-w-48">
              {item?.media_type === "person" ? (
                <PersonCard
                  id={item?.id || `placeholder-${index}`}
                  name={item?.name || "Loading..."}
                  imgUrl={item?.profile_path || null}
                  loadingState={loading || !item}
                />
              ) : (
                <MoviePoster
                  id={item?.id || `placeholder-${index}`}
                  mediaType={item?.media_type || "loading"}
                  title={
                    item?.media_type === "tv"
                      ? item?.name || "Loading..."
                      : item?.title || "Loading..."
                  }
                  imgUrl={item?.poster_path || null}
                  loadingState={loading || !item}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="my-2">
        <h1 className="text-2xl font-black text-left px-4">Top Rated: </h1>
        <div className="carousel carousel-center max-w-full  space-x-3 p-3">
          {(topRated && topRated.length > 0
            ? topRated
            : Array.from({ length: 10 })
          ).map((item, index) => (
            <div key={item?.id || index} className="carousel-item max-w-48">
              {item?.media_type === "person" ? (
                <PersonCard
                  id={item?.id || `placeholder-${index}`}
                  name={item?.name || "Loading..."}
                  imgUrl={item?.profile_path || null}
                  loadingState={loading || !item}
                />
              ) : (
                <MoviePoster
                  id={item?.id || `placeholder-${index}`}
                  mediaType={item?.media_type || "loading"}
                  title={
                    item?.media_type === "tv"
                      ? item?.name || "Loading..."
                      : item?.title || "Loading..."
                  }
                  imgUrl={item?.poster_path || null}
                  loadingState={loading || !item}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
