import React from "react";

export const ErrorPage = ({ name }) => {
  return (
    <div className="py-16 text-center text-xl text-gray-500 small:text-2xl">
      <h1>Oops! :( </h1>
      <p>Doesn't have any {name} yet.</p>
    </div>
  );
};
