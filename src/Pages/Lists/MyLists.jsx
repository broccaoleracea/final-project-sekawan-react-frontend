import React from "react";
import ListFetcher from "../../Components/Fetchers/listFetcher";
import { useSelector } from "react-redux";
import MovieCardHorizontal from "../../Components/Cards/MovieCardHorizontal";

const MyLists = () => {
  const myLists = useSelector((state) => state.list.list);
  return (
    <div className="main m-4 text-left">
      <ListFetcher />
      <h1 className="text-4xl font-bold mb-2">My Lists</h1>
      <p>Total list: {myLists.total_results}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3">
        {myLists?.results?.map((list) => (
          <div key={list.id} className="">
            <MovieCardHorizontal
              posterUrl={list.poster_path}
              title={list.name}
              id={list.id}
              desc={list.description}
              itemCount={list.item_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;
