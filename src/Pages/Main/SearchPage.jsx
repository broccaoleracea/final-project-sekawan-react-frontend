import React, { useEffect } from "react";
import FetcherSearch from "../../Components/Fetchers/SearchMovies";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import { setSearch } from "../../Components/Store/Action/movieAction";
import PersonCard from "../../Components/Cards/PersonCard";

const SearchPage = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);
  const query = new URLSearchParams(useLocation().search).get("q");

  const queryParams = new URLSearchParams(useLocation().search);
  const page = parseInt(queryParams.get("page") || "1", 10);

  return (
    <div>
      <FetcherSearch query={query} page={page} />
      {search ? (
        <div className="main px-5 text-left">
          <p className="text-2xl font-black text-left">
            {search?.total_results}{" "}
            {search?.total_results === 1 ? "result" : "results"} found.
          </p>
          <p className="text-slate-600">
            Showing {search?.results?.length} out of {search?.total_results}{" "}
            {search?.total_results === 1 ? "result" : "results"}. Page {page}{" "}
            from {search?.total_pages} total.
          </p>

          <div className="join">
            <Link to={`/search?q=${query}&page=${Math.max(page - 1, 1)}`}>
              <button className="join-item btn" disabled={page <= 1}>
                «
              </button>
            </Link>

            <button className="join-item btn">Page {page}</button>
            <button
              className="join-item btn"
              disabled={page >= search?.total_pages}
            >
              <Link to={`/search?q=${query}&page=${page + 1}`}>»</Link>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4">
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
