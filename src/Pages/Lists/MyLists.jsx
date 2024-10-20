import React from "react";
import ListFetcher from "../../Components/Fetchers/listFetcher";
import { useSelector } from "react-redux";
import MovieCardHorizontal from "../../Components/Cards/MovieCardHorizontal";

const MyLists = () => {
  const myLists = useSelector((state) => state.list.list);
  const loading = useSelector((state) => state.loading.loading);
  return (
    <div className="main m-4 text-left">
      <ListFetcher />
      <h1 className="text-4xl font-bold mb-2">My Lists</h1>
      <p>Total list: {myLists.total_results}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3">
        {(myLists?.results && myLists.results.length > 0
          ? myLists.results
          : Array.from({ length: 6 })
        ).map((list, index) => (
          <div key={list?.id || `placeholder-${index}`} className="">
            <MovieCardHorizontal
              posterUrl={list?.poster_path || null}
              title={list?.name}
              id={list?.id}
              desc={list?.description}
              itemCount={list?.item_count || 0}
              loadingState={loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;
