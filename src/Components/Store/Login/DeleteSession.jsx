import axios from "axios";
import { useState } from "react";

const DeleteSession = () => {
  const [message, setMessage] = useState(""); // success/error messages

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
      setMessage("Session successfully deleted!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while deleting session.");
    }
  };

  return (
    <>
      <button
        onClick={delSession}
        disabled={!localStorage.getItem("session_id")}
      >
        Logout
      </button>

      {message && <p>{message}</p>}
    </>
  );
};

export default DeleteSession;
