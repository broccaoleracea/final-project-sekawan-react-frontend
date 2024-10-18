import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setState } from "../../Components/Store/Action/movieAction";
import DetailMovieFetcher from "../../Components/Fetchers/DetailFetcher";
import { useState } from "react";
import Slider from "../../Components/Slider";

const Details = () => {
  const { id, mediaType } = useParams();
  const detail = useSelector((state) => state.detail.detail);
  const itemState = useSelector((state) => state.itemState.itemState);

  const [isRating, setIsRating] = useState(false); //The visibility of value slider
  const ratingValue = itemState?.rated?.value || null;
  const [tempRatingValue, setTempRatingValue] = useState(ratingValue || 0);
  const dispatch = useDispatch();

  if (!itemState) {
    return <div>Loading...</div>;
  }
  const openRateMenu = () => setIsRating(true);
  const closeRateMenu = () => setIsRating(false);

  const submitRating = async () => {
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
      let response;
      if (mediaType === "movie") {
        response = await axios.post(
          `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${apiKey}`,
          body,
          { headers }
        );
      } else if (mediaType === "tv") {
        response = await axios.post(
          `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${apiKey}`,
          body,
          { headers }
        );
      }
      const updatedItemState = {
        ...itemState,
        rated: { value: newRatingValue },
      };
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

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      let response;
      if (mediaType === "movie") {
        response = await axios.delete(
          `https://api.themoviedb.org/3/movie/${itemState.id}/rating?api_key=${apiKey}`,
          { headers }
        );
      } else if (mediaType === "tv") {
        response = await axios.delete(
          `https://api.themoviedb.org/3/tv/${itemState.id}/rating?api_key=${apiKey}`,
          { headers }
        );
      }
      const updatedItemState = {
        ...itemState,
        rated: "false",
      };
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
      <div className="main lg:px-5 text-left">
        <figure>
          <img
            src={"https://image.tmdb.org/t/p/w1280" + detail.backdrop_path}
            className="object-cover rounded-lg w-full h-96"
            alt={detail.title || detail.name}
          ></img>
        </figure>
        <div className="flex gap-6 my-3 justify-center">
          <div className="left-pane basis-3/5">
            <div className="main-details">
              <div className="title">
                <h1 className="text-2xl font-black">
                  {detail.title || detail.name}
                </h1>
              </div>
              <p className="text-left">{detail.details || detail.overview}</p>
            </div>

            {/* <div className="">
              <div className="flex gap-4 justify-evenly">
                <div className="">
                  <p className="text-1xl py-3 px-1 font-black">Foods:</p>
                  <ul className="list-disc list-inside w-72 bg-base-200 p-2 px-5 rounded-box">
                    {resto.restaurant.menus.foods.map((food, index) => (
                      <li key={index} className="my-2">
                        <a>{food.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <p className="text-1xl py-3 px-1 font-black">Drinks:</p>
                  <ul className="list-disc list-inside w-72 bg-base-200 p-2 px-5 rounded-box">
                    {resto.restaurant.menus.drinks.map((drink, index) => (
                      <li className="my-2" key={index}>
                        {drink.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-black my-3">Customer Reviews:</h3>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Got something to say? Write a review!"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  opacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </label>

              <div className="rounded-box py-3">
                <ul>
                  {resto?.customerReviews?.map((review, index) => (
                    <li key={index}>
                      <div className="chat chat-start">
                        <div className="chat-header">{review.name}</div>
                        <div className="chat-bubble">{review.review}</div>
                        <div className="chat-footer opacity-50">
                          ({review.date})
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>

          <div className="right-pane">
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
                    {isRating === false ? "My rating: " : "Previous rating : "}
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
                    onChange={(newValue) => setTempRatingValue(newValue)}
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
            <div className="stats w-full stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">Popularity</div>
                <div className="stat-value">{detail.popularity}</div>
                {/* <div className="stat-desc">{resto.restaurant.address}</div> */}
              </div>
              <div className="stat">
                <div className="stat-title">Genres</div>
                <div className="stat-value">
                  {detail.genres ? (
                    detail.genres.map((genre) => (
                      <h3 className="text-lg font-semibold" key={genre.id}>
                        {genre.name}
                      </h3>
                    ))
                  ) : (
                    <p>Loading genres...</p>
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
