import axios from "axios";
import { useState } from "react";

const CreateAuth = () => {
  const [token, setToken] = useState(null); // token
  const [message, setMessage] = useState(""); //  success/error messages

  // create authentication token
  const createReqToken = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        { headers }
      );
      const requestToken = response.data.request_token;
      setToken(requestToken);
      window.open(
        `https://www.themoviedb.org/authenticate/${requestToken}`,
        "_blank",
        "noopener noreferrer"
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while creating token.");
    }
  };

  // create session after successful authentication
  const createSession = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = {
      request_token: token,
    };

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
        body,
        { headers }
      );

      localStorage.setItem("session_id", response.data.session_id);

      //set session to expire
      const sessionId = response.data.session_id;
      const expirationTime = new Date().getTime() + 3600000; // 1h (in ms)
      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("session_expiration", expirationTime);

      setMessage("Session successfully created!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while creating session.");
    }
  };

  return (
    <>
      <button onClick={createReqToken}>Sign in using your TMDB account</button>
      <button onClick={createSession} disabled={!token}>
        Check account link status
      </button>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreateAuth;
