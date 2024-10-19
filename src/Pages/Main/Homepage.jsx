import React from "react";
import MoviePoster from "../../Components/Cards/MoviePoster";
import TrendMovieFetcher from "../../Components/Fetchers/TrendingMovieFetcher";
import { useSelector } from "react-redux";
import Slider from "../../Components/Slider";
import PersonCard from "../../Components/Cards/PersonCard";

const Homepage = () => {
  const trend = useSelector((state) => state.trend.trend);
  return (
    <div>
      {/* Hero Element */}
      <div className="hero max-h-96 h-full bg-base-900">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Nightflix</h1>
            <p className="mb-5">
              Discover various movies curated just for you. or idk this thing
              doesnt have any complex algorithm i just wanted to sounds cool
              okay? alright then. wonderhoy~
            </p>
          </div>
        </div>
      </div>

      {/* Trending section */}
      <div className="my-5">
        <h1 className="text-2xl font-black text-left px-4">On Trending : </h1>
        <div className="carousel carousel-center max-w-full  space-x-3 p-3">
          <TrendMovieFetcher />
          {trend?.map((item) => (
            <div key={item.id} className="carousel-item">
              {item.media_type === "person" ? (
                <PersonCard
                  id={item.id}
                  name={item.name}
                  imgUrl={item.profile_path}
                />
              ) : (
                <MoviePoster
                  id={item.id}
                  mediaType={item.media_type}
                  title={item.media_type === "tv" ? item.name : item.title}
                  imgUrl={item.poster_path}
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
