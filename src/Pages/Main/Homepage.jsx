import React from "react";
import MoviePoster from "../../Components/Cards/MoviePoster";
import TrendMovieFetcher from "../../Components/Fetchers/TrendingMovieFetcher";
import { useSelector } from "react-redux";
import PersonCard from "../../Components/Cards/PersonCard";

const Homepage = () => {
  const trend = useSelector((state) => state.trend.trend);
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
          {(trend && trend.length > 0 ? trend : Array.from({ length: 10 })).map(
            (item, index) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
