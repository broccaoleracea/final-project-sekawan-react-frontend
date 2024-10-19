import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import ListDetailFetcher from "../../Components/Fetchers/listItemsFetcher";

const ListDetail = () => {
  const list = useSelector((state) => state.list.list);
  const { id } = useParams();
  return (
    <div className="main m-4 text-left">
      <ListDetailFetcher id={id} />
      <h1 className="text-4xl font-bold mb-2">{list.name}</h1>
      <p>
        List created by <span className="italic">{list.created_by}</span>
      </p>
      <p>Items count : {list.item_count}</p>
      {list.item_count > 0 ? (
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4">
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
      ) : (
        <div className="flex w-full h-full justify-center align-middle text-slate-600 italic">
          There's no item to display.
        </div>
      )}
    </div>
  );
};

export default ListDetail;
