import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setList, setLoading } from "../Store/Action/movieAction";

const RatedFetcher = ({ type, uid }) => {
  const sessionId = localStorage.getItem("session_id");
  const user = useSelector((state) => state.user.user);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
  if (!type) {
    type = "movies";
  }

  const dispatch = useDispatch();

  const ratedFetcher = useCallback(async () => {
    dispatch(setLoading(true));
    console.log(type);
    try {
      let headers = {
        accept: "application/json",
        Authorization: "Bearer " + apiToken,
      };

      let url = `https://api.themoviedb.org/3/account/${uid}/rated/${type}?api_key=${apiKey}`;
      if (sessionId) {
        url += `&session_id=${sessionId}`;
      }
      const response = await axios.get(url, { headers });
      const movieData = response.data;
      console.log(movieData);
      console.log(url);
      dispatch(setList(movieData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, apiKey, apiToken, sessionId, user?.id, type]);

  useEffect(() => {
    ratedFetcher();
  }, [ratedFetcher, type]);

  return null;
};

RatedFetcher.propTypes = {};

export default RatedFetcher;
