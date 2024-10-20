import { useCallback, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setList, setLoading } from "../Store/Action/movieAction";

const ListItemsFetcher = ({ id }) => {
  const sessionId = localStorage.getItem("session_id");
  const user = useSelector((state) => state.user.user);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();

  const listItemsFetcher = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      let headers = {
        accept: "application/json",
        Authorization: "Bearer " + apiToken,
      };

      let url = `https://api.themoviedb.org/3/list/${id}?api_key=${apiKey}`;

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
  }, [dispatch, apiKey, apiToken, id, sessionId]);

  useEffect(() => {
    listItemsFetcher();
  }, [listItemsFetcher]);

  return null;
};

ListItemsFetcher.propTypes = {};

export default ListItemsFetcher;
