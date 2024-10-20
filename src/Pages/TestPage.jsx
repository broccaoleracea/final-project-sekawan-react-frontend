import React from "react";
import CreateAuth from "../Components/Store/Login/CreateAuth";
import DeleteSession from "../Components/Store/Login/DeleteSession";

const TestPage = () => {
  return (
    <div>
      <CreateAuth /> <DeleteSession />
    </div>
  );
};

export default TestPage;
