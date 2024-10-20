import { Link } from "react-router-dom";
const MoviePoster = ({ loadingState, imgUrl, title, id, mediaType }) => {
  return (
    <Link
      to={`/detail/${mediaType === "tv" ? "tv" : "movie"}/${id}`}
      className={`${loadingState ? "disabled-links" : null}`}
    >
      <div className="card w-full">
        {loadingState ? (
          <div className="shadow-xl min-w-48 w-full h-72 rounded-md mb-1 skeleton"></div>
        ) : (
          <figure className={`rounded-md mb-1`}>
            <img
              src={
                imgUrl
                  ? `https://image.tmdb.org/t/p/w342${imgUrl}`
                  : "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
              }
              alt={title}
              className="object-cover shadow-xl min-w-36 w-full h-72"
            />
          </figure>
        )}

        <div className="card-body card-end p-0 w-48">
          <div className="tooltip" data-tip={title}>
            {loadingState ? (
              <div className="skeleton h-4 w-36"></div>
            ) : (
              <h2 className="card-title text-left text-sm w-48 truncate block">
                {title}
              </h2>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MoviePoster;
