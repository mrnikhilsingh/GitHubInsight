import React from "react";

export const RepoCard = () => {
  return (
    <div
      id="repo-card"
      className="overflow-hidden rounded-lg border bg-blue-50"
    >
      <div id="repo-body" className="p-4 text-gray-700">
        <div
          id="repo-heading"
          className="flex items-center justify-between pb-1 text-lg font-semibold"
        >
          <a href="#">
            <p title="click to see on GitHub">Lorem ipsum dolor, sit amet</p>
          </a>
          <button className="cursor-default rounded-lg border bg-gray-200 px-3 text-sm uppercase">
            public
          </button>
        </div>
        <div id="repo-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In eveniet
          laboriosam aspernatur saepe magnam eligendi sapiente itaque deserunt
        </div>
      </div>
      <div
        id="repo-footer"
        className="flex min-h-12 gap-4 bg-gray-200 px-4 font-semibold"
      >
        <p className="flex items-center gap-1 text-gray-700">
          <i class="fa-solid fa-code"></i>Language
        </p>
        <p className="flex items-center gap-1 text-gray-700">
          <i class="fa-solid fa-star"></i>Stars
        </p>
        <p className="flex items-center gap-1 text-gray-700">
          <i class="fa-solid fa-code-fork"></i>Forks
        </p>
      </div>
    </div>
  );
};
