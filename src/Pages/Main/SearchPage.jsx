import FetcherSearch from "../../Components/Fetchers/SearchMovies";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import PersonCard from "../../Components/Cards/PersonCard";
import MoviePosterSkeleton from "../../Components/Cards/MoviePosterSkeleton";
import Pagination from "../../Components/Pagination";

const SearchPage = () => {
  const search = useSelector((state) => state.search.search);
  const loading = useSelector((state) => state.loading.loading);
  const query = new URLSearchParams(useLocation().search).get("q");

  const queryParams = new URLSearchParams(useLocation().search);
  const page = parseInt(queryParams.get("page") || "1", 10);

  return (
    <div>
      <FetcherSearch query={query} page={page} />

      <div className="">
        {search ? (
          <div className="main px-5 text-left flex flex-col justify-center items-center">
            <div className="flex justify-between w-full ">
              {loading ? (
                <>
                  <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                  <div className="skeleton h-12 w-36"></div>
                </>
              ) : (
                <>
                  <div className="info">
                    <p className="text-2xl font-black text-left">
                      {search?.total_results}{" "}
                      {search?.total_results === 1 ? "result" : "results"}{" "}
                      found.
                    </p>
                    <p className="text-slate-600">
                      Showing {search?.results?.length} out of{" "}
                      {search?.total_results}{" "}
                      {search?.total_results === 1 ? "result" : "results"}. Page{" "}
                      {page} from {search?.total_pages} total.
                    </p>
                  </div>

                  <Pagination
                    query={query}
                    total={search?.total_pages}
                    i={page}
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4 max-w-screen-xl">
              {loading ? (
                <>
                  {Array.from({ length: 20 }, (_, index) => (
                    <MoviePosterSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
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
                          title={
                            item.media_type === "tv" ? item.name : item.title
                          }
                          imgUrl={item.poster_path}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-2xl my-2 px-5 font-black text-left">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
