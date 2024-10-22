import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/Action/userAction";
import { useNavigate } from "react-router-dom";

const DeleteSession = () => {
  const [message, setMessage] = useState(""); // success/error messages
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // delete session
  const delSession = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;
    const sessionId = localStorage.getItem("session_id");

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = {
      session_id: sessionId,
    };

    try {
      const response = await axios({
        method: "delete",
        url: `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`,
        headers,
        data: body,
      });

      localStorage.removeItem("session_id");
      dispatch(setUser(null));
      setMessage("Session successfully deleted!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while deleting session.");
    } finally {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <button
        onClick={delSession}
        disabled={!localStorage.getItem("session_id")}
        className="text-slate-700 underline"
      >
        Logout
      </button>

      {message && <p>{message}</p>}
    </>
  );
};

export default DeleteSession;
