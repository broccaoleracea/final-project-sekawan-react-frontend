const checkSessionValidity = () => {
  const sessionId = localStorage.getItem("session_id");
  const sessionExpiration = localStorage.getItem("session_expiration");

  if (sessionId && sessionExpiration) {
    const now = new Date().getTime();
    if (now > sessionExpiration) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("session_expiration");
      console.log("Session has expired.");
      return false;
    }
    return true; // Session is still valid
  }
  return false; // No session
};
