import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setState } from "../../Components/Store/Action/movieAction";
import DetailMovieFetcher from "../../Components/Fetchers/DetailFetcher";
import { useState } from "react";
import Slider from "../../Components/Slider";
import FormatDate from "../../Components/FormatDate";
import YouTubeEmbed from "../../Components/YouTubeEmbed";
import YoutubeEmbed from "../../Components/YouTubeEmbed";

const Details = () => {
  const { id, mediaType } = useParams();
  const detail = useSelector((state) => state.detail.detail);
  const loading = useSelector((state) => state.loading.loading);
  const itemState = useSelector((state) => state.itemState.itemState);
  const user = useSelector((state) => state.user.user);

  const [isRating, setIsRating] = useState(false); //The visibility of value slider
  const ratingValue = itemState?.rated?.value || null;
  const [tempRatingValue, setTempRatingValue] = useState(ratingValue || 0);
  const dispatch = useDispatch();
  const genderMap = {
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  const openRateMenu = () => setIsRating(true);
  const closeRateMenu = () => setIsRating(false);

  const submitRating = async () => {
    const sessionId = localStorage.getItem("session_id");
    const newRatingValue = tempRatingValue;
    setIsRating(true);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = { value: newRatingValue };

    try {
      let url;
      if (mediaType === "movie") {
        url = `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${apiKey}`;
      } else if (mediaType === "tv") {
        url = `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${apiKey}`;
      }
      const updatedItemState = {
        ...itemState,
        rated: { value: newRatingValue },
      };
      if (sessionId) {
        url += `&session_id=${sessionId}`;
      }
      const response = await axios.post(url, body, { headers });
      dispatch(setState(updatedItemState));
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error posting rating:",
        error.response?.data || error.message
      );
    } finally {
      setIsRating(false);
    }
  };

  const deleteRating = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;
    const sessionId = localStorage.getItem("session_id");

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      let url;
      if (mediaType === "movie") {
        url = `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${apiKey}`;
      } else if (mediaType === "tv") {
        url = `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${apiKey}`;
      }
      if (sessionId) {
        url += `&session_id=${sessionId}`;
      }
      const updatedItemState = {
        ...itemState,
        rated: "false",
      };
      const response = await axios.post(url, { headers });
      dispatch(setState(updatedItemState));
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error deleting rating:",
        error.response?.data || error.message
      );
    } finally {
      setIsRating(false);
    }
  };

  return (
    <>
      <DetailMovieFetcher id={id} type={mediaType} />
      <div className="main text-left">
        {mediaType != "person" ? (
          <>
            {loading ? (
              <div className="w-full rounded-none min-h-96 skeleton"></div>
            ) : (
              <figure>
                <img
                  src={
                    detail.backdrop_path
                      ? "https://image.tmdb.org/t/p/w1280" +
                        detail.backdrop_path
                      : "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                  }
                  className="object-cover w-full min-h-96 md:max-h-96"
                  alt={detail.title || detail.name}
                ></img>
              </figure>
            )}
          </>
        ) : null}
        <div className="w-full flex justify-center">
          <div className="max-w-screen-xl">
            <div className="w-full px-6 my-4 flex justify-between items-end">
              <div className="title">
                {loading ? (
                  <div className="flex w-52 my-2 flex-col gap-2">
                    <div className="skeleton h-8 w-96"></div>
                    {mediaType != "person" ? (
                      <div className="skeleton h-4 w-36"></div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-black">
                      {detail.title || detail.name}
                    </h1>
                    {mediaType != "person" ? (
                      <p className="text-slate-600  italic">
                        {detail.original_title || detail.original_name}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
              {mediaType != "person" ? (
                <div className="">
                  {loading ? (
                    <div className="flex w-20 flex-col gap-2">
                      <div className="skeleton h-8 w-full"></div>
                    </div>
                  ) : (
                    <div className="rating align-baseline items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="align-baseline"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <h1 className="text-4xl font-black ml-2">
                        {" "}
                        {detail.vote_average}
                      </h1>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            <div className="divider"></div>
            <div className="flex gap-6 px-6 justify-center max-w-screen-xl w-full">
              <div className="flex-1 left-pane basis-4/6 overflow-x-clip overflow-hidden">
                <div className="main-details">
                  <p className="text-left">
                    {loading ? (
                      <div className="flex flex-col gap-2">
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-96"></div>
                      </div>
                    ) : (
                      <>
                        {detail.details ||
                          detail.overview ||
                          detail.biography || (
                            <span className="text-slate-600 italic">
                              No description provided.
                            </span>
                          )}
                      </>
                    )}
                  </p>

                  <div className="my-3">
                    <div className="flex justify-between">
                      <div className="text-bold">Videos</div>

                      <div className="text-bold underline">
                        <Link to="/detail/">View more {`>`}</Link>
                      </div>
                    </div>
                    <div className="divider my-1"></div>
                    <div className="carousel carousel-center space-x-3 overflow-hidden overflow-x-clip">
                      {loading ? (
                        <div className="carousel-item h-56 w-96 skeleton"></div>
                      ) : (
                        detail?.videos?.results
                          .slice(0, 3)
                          .map((video, index) => (
                            <div
                              className="carousel-item flex-shrink-0 w-full md:w-1/3"
                              key={index}
                            >
                              <YoutubeEmbed videoId={video.key} />
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex-1 right-pane basis-2/6">
                {mediaType != "person" ? (
                  <>
                    {user ? (
                      <div className="">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-6 w-16"></div>
                          </div>
                        ) : (
                          <div className="rating-cont">
                            {ratingValue === null ? (
                              <div>
                                <p>No rating given yet. Give one?</p>
                                {isRating === false ? (
                                  <button
                                    className="btn btn-success my-3 h-8 min-h-8"
                                    onClick={openRateMenu}
                                  >
                                    Give a rating
                                  </button>
                                ) : null}
                              </div>
                            ) : (
                              <div>
                                <p className="text-left text-sm">
                                  {isRating === false
                                    ? "My rating: "
                                    : "Previous rating : "}
                                  <span className="text-2xl font-extrabold">
                                    {ratingValue}
                                  </span>
                                </p>
                                {isRating === false ? (
                                  <div className="flex my-3 gap-3">
                                    <button
                                      className="btn btn-warning h-8 min-h-8"
                                      onClick={openRateMenu}
                                    >
                                      Change rating
                                    </button>
                                    <button
                                      className="btn btn-error h-8 min-h-8"
                                      onClick={deleteRating}
                                    >
                                      Delete my rating
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                            )}

                            {isRating && (
                              <div>
                                <Slider
                                  onChange={(newValue) =>
                                    setTempRatingValue(newValue)
                                  }
                                />
                                <div className="flex my-3 gap-3">
                                  <button
                                    className="btn btn-primary h-8 min-h-8"
                                    onClick={closeRateMenu}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-success  h-8 min-h-8"
                                    onClick={submitRating}
                                  >
                                    Submit Rating
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-left font-bold">
                        <p>You need to be logged in to this action.</p>
                        <Link to="/auth">
                          <a className="btn-secondery btn my-3 h-8 min-h-8">
                            Log in
                          </a>
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <figure>
                    <img
                      src={
                        detail.profile_path
                          ? "https://image.tmdb.org/t/p/w1280" +
                            detail.profile_path
                          : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                      }
                      className="object-cover rounded-lg w-full h-96 max-w-96 min-w-96"
                      alt={detail.name}
                    ></img>
                  </figure>
                )}

                <div className="stats w-full stats-vertical max-w-96 text-wrap">
                  {mediaType === "person" ? (
                    <div className="stat  px-0">
                      {loading ? (
                        <div className="flex w-full flex-col gap-2">
                          <div className="skeleton h-4 w-20"></div>
                          <div className="skeleton h-6 w-full"></div>
                        </div>
                      ) : (
                        <>
                          <div className="stat-title">Gender</div>
                          <div className="stat-value break-words whitespace-normal">
                            {genderMap[detail.gender] || "Unknown"}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Release Date */}
                      <div className="stat px-0">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-6 w-full"></div>
                          </div>
                        ) : (
                          <>
                            <div className="stat-title">
                              {mediaType === "tv"
                                ? "First air date"
                                : "Release date"}
                            </div>
                            <div className="text-lg font-semibold">
                              {detail ? (
                                <FormatDate
                                  dateString={
                                    detail?.release_date ||
                                    detail?.first_air_date
                                  }
                                />
                              ) : null}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Genres */}
                      <div className="stat px-0 text-wrap">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-6 w-full"></div>
                          </div>
                        ) : (
                          <>
                            <div className="stat-title">Genres</div>
                            <div className="stat-value">
                              {detail.genres ? (
                                <h3 className="text-lg font-semibold break-words whitespace-normal">
                                  {detail.genres.map((genre, index) => (
                                    <span key={genre.id}>
                                      {genre.name}
                                      {index < detail.genres.length - 1 && ", "}
                                    </span>
                                  ))}
                                </h3>
                              ) : (
                                <p>Loading genres...</p>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Status */}
                      <div className="stat px-0">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-6 w-full"></div>
                          </div>
                        ) : (
                          <>
                            <div className="stat-title">Status</div>
                            <div className="text-lg font-semibold">
                              {detail.status}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Popularity */}
                      <div className="stat px-0">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-6 w-full"></div>
                          </div>
                        ) : (
                          <>
                            <div className="stat-title">Popularity</div>
                            <div className="text-lg font-semibold">
                              {detail.popularity}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Prod companies */}
                      <div className="stat px-0">
                        {loading ? (
                          <div className="flex w-full flex-col gap-2">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-6 w-full"></div>
                          </div>
                        ) : (
                          <>
                            <div className="stat-title">
                              Production companies
                            </div>
                            <div className="stat-value">
                              {detail.production_companies ? (
                                <h3 className="text-lg text-wrap font-semibold">
                                  {detail.production_companies.map(
                                    (prod, index) => (
                                      <span key={prod.id}>
                                        {prod.name}
                                        {index <
                                          detail.production_companies.length -
                                            1 && ", "}
                                      </span>
                                    )
                                  )}
                                </h3>
                              ) : (
                                <p>Loading companies...</p>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
