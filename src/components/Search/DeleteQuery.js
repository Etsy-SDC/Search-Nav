import React from "react";

function DeleteQuery(props) {
  const { query, resetQuery } = props;
  const baseURL =
    "http://localhost:3030/";

  if (query.length) {
    return (
      <img
        className={"navigation-deleteQuery"}
        src={`${baseURL}dh.svg`}
        onClick={resetQuery}
      />
    );
  } else {
    return <div></div>;
  }
}

export default DeleteQuery;
