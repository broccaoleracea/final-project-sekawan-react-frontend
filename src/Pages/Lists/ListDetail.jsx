import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviePoster from "../../Components/Cards/MoviePoster";
import ListDetailFetcher from "../../Components/Fetchers/listItemsFetcher";
const ListDetail = () => {
  const list = useSelector((state) => state.list.list);
  const loading = useSelector((state) => state.loading.loading);
  const { id } = useParams();
  return (
    <div className="main m-4 text-left flex flex-col justify-center items-center">
      <ListDetailFetcher id={id} />
      <div className="min-w-full">
        {loading ? (
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-12 w-full"></div>
            <div className="skeleton h-4 w-36"></div>
            <div className="skeleton h-4 w-36"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold">{list.name}</h1>
            <p>
              List created by <span className="italic">{list.created_by}</span>
            </p>
            <p>Items count : {list.item_count}</p>
          </>
        )}
      </div>

      {!loading && list.item_count === 0 ? (
        <div className="flex w-full h-full justify-center align-middle text-slate-600 italic">
          There's no item to display.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4 max-w-screen-xl">
          {(list?.items && list.items.length > 0
            ? list.items
            : Array.from({ length: 12 })
          ) // Placeholder items while loading
            .map((movie, index) => (
              <div key={movie?.id || index} className="">
                <MoviePoster
                  imgUrl={movie?.poster_path || null}
                  title={movie?.name || movie?.title}
                  id={movie?.id}
                  mediaType={movie?.media_type}
                  loadingState={loading}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListDetail;
