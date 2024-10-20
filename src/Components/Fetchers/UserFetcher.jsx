import { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../Store/Action/movieAction";
import { setUser } from "../Store/Action/userAction";

const UserFetcher = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const sessionId = localStorage.getItem("session_id");
  const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();

  const fetchMovieList = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      let headers = {
        accept: "application/json",
        Authorization: "Bearer " + apiRDT,
      };

      let url = `https://api.themoviedb.org/3/account?api_key=${apiKey}`;

      // Append session_id if it exists
      if (sessionId) {
        url += `&session_id=${sessionId}`;
        const response = await axios.get(url, { headers });
        const user = response.data;
        console.log(user);

        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, apiKey, apiRDT, sessionId]);

  useEffect(() => {
    fetchMovieList();
  }, [fetchMovieList]);

  return null;
};
UserFetcher.propTypes = {};

export default UserFetcher;
