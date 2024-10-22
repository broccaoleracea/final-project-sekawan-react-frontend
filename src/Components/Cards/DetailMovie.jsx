import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setList } from "../Store/Action/movieAction";
import Slider from "../Slider";
import { useDispatch } from "react-redux";

const DetailMovie = ({
  loadingState,
  id,
  posterUrl,
  title,
  desc,
  rateAvg,
  myRating,
  incRatingOpt,
  type,
  onRatingSubmit,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const [tempRatingValue, setTempRatingValue] = useState(myRating || 0);
  const dispatch = useDispatch();

  const toggleTooltip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  const handleLinkClick = (e) => {
    if (showTooltip) {
      // Prevent link navigation if tooltip is open
      e.preventDefault();
    }
  };

  const submitRating = async () => {
    const sessionId = localStorage.getItem("session_id");
    const newRatingValue = tempRatingValue;

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = { value: newRatingValue };

    try {
      let url;
      if (type === "movie") {
        url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`;
      } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/tv/${id}/rating?api_key=${apiKey}`;
      }
      if (sessionId) {
        url += `&session_id=${sessionId}`;
      }
      const response = await axios.post(url, body, { headers });
      onRatingSubmit({ id, rating: newRatingValue });
      //dispatch the rated data?
    } catch (error) {
      console.error(
        "Error posting rating:",
        error.response?.data || error.message
      );
    } finally {
      setShowTooltip(!showTooltip);
    }
  };

  const deleteRating = async (e) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;
    const sessionId = localStorage.getItem("session_id");

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(showTooltip);

    try {
      let url;
      if (type === "movie") {
        url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`;
      } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/tv/${id}/rating?api_key=${apiKey}`;
      }
      if (sessionId) {
        url += `&session_id=${sessionId}`;
      }

      const response = await axios.delete(url, { headers });

      dispatch({
        type: "DELETE_RATING_SUCCESS",
        payload: { id, type },
      });
    } catch (error) {
      console.error(
        "Error deleting rating:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Link to={`/detail/${type}/${id}`} onClick={handleLinkClick}>
      <div
        className={`card card-compact card-side  shadow-xl text-left w-full ${
          loadingState ? " skeleton" : " bg-base-100"
        }`}
      >
        {posterUrl && !loadingState ? (
          <figure className={`max-w-28  ${loadingState ? " skeleton" : null}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
              alt={title}
              className="object-cover h-auto w-full"
            />
          </figure>
        ) : null}
        <div className="card-body">
          <div className="card-head flex justify-around">
            {loadingState ? (
              <>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4"></div>
              </>
            ) : (
              <>
                <h2 className="card-title">{title}</h2>
                <span className="font-black ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
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
                  {rateAvg}
                </span>
              </>
            )}
          </div>

          {loadingState ? (
            <div className="skeleton h-4 w-full"></div>
          ) : (
            <span className="line-clamp-2">
              {desc === "" ? (
                <span className="italic text-slate-600">
                  No description provided.
                </span>
              ) : (
                desc
              )}
            </span>
          )}

          {loadingState && incRatingOpt ? (
            <div className="skeleton h-4 w-28"></div>
          ) : (
            <div className="flex justify-around">
              <div className="text-left ">
                My rating :{" "}
                <span className="font-bold text-lg">{myRating}</span>
              </div>
              <div className="justify-end relative inline-block">
                <button
                  className="btn btn-outline rounded-full min-h-8 max-h-8"
                  onClick={toggleTooltip}
                >
                  {showTooltip ? "Cancel" : "Change rating"}
                </button>
                {showTooltip && (
                  <div className="absolute top-full mt-2 p-4 min-w-96 bg-gray-800 text-white rounded-lg shadow-lg">
                    <div>
                      <h4>Change rating</h4>
                      <Slider
                        onChange={(newValue) => setTempRatingValue(newValue)}
                      />
                      <button
                        className="btn btn-success  h-8 min-h-8"
                        onClick={submitRating}
                      >
                        Submit Rating
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-error rounded-full min-h-8 max-h-8 ml-2"
                  onClick={deleteRating}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DetailMovie;
