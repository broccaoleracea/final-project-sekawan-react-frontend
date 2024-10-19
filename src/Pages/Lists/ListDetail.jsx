import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import ListDetailFetcher from "../../Components/Fetchers/listItemsFetcher";

const ListDetail = () => {
  const list = useSelector((state) => state.list.list);
  const { id } = useParams();
  return (
    <div>
      <ListDetailFetcher id={id} />
      <h1 className="text-4xl font-bold mb-6 text-center">List Details</h1>
      <p>Name : {list.name}</p>
      <p>Created by : {list.created_by}</p>
      <p>Items count : {list.item_count}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list?.items?.map((movie) => (
          <div key={movie.id} className="">
            <MoviePoster
              imgUrl={movie.poster_path}
              title={movie.name || movie.title}
              id={movie.id}
              mediaType={movie.media_type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDetail;
