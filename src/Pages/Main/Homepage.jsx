import React from "react";
import MoviePoster from "../../Components/Cards/MoviePoster";
import TrendMovieFetcher from "../../Components/Fetchers/TrendingMovieFetcher";
import { useSelector } from "react-redux";
import Slider from "../../Components/Slider";

const Homepage = () => {
  const trend = useSelector((state) => state.trend.trend);
  return (
    <div>
      {/* Hero Element */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Trending section */}
      <div className="my-5">
        <h1 className="text-2xl font-black text-left px-4">On Trending : </h1>
        <div className="carousel carousel-center max-w-full  space-x-3 p-3">
          <TrendMovieFetcher />
          {trend?.map((movie) => (
            <div key={movie.id} className="carousel-item">
              <MoviePoster
                id={movie.id}
                mediaType={movie.media_type}
                title={movie.media_type === "tv" ? movie.name : movie.title}
                imgUrl={movie.poster_path}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
