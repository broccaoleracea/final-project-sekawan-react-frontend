import React, { useEffect } from "react";
import FetcherSearch from "../../Components/Fetchers/SearchMovies";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import { setSearch } from "../../Components/Store/Action/movieAction";
import PersonCard from "../../Components/Cards/PersonCard";

const SearchPage = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);
  const query = new URLSearchParams(useLocation().search).get("q");

  return (
    <div>
      <FetcherSearch query={query} />
      {search ? (
        <div className="main px-5">
          <p className="text-2xl my-2 font-black text-left">
            {search?.results?.length}{" "}
            {search?.results?.length === 1 ? "result" : "results"} found.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {search?.results?.map((item) => (
              <div key={item.id}>
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
      ) : (
        <p className="text-2xl my-2 px-5 font-black text-left">
          No results found
        </p>
      )}
    </div>
  );
};

export default SearchPage;
