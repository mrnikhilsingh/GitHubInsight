import React from "react";

export const RepoCard = ({ repo }) => {
  return (
    <div
      id="repo-card"
      className="flex flex-col justify-between overflow-hidden rounded-lg border bg-blue-50 dark:border-blue-950 dark:bg-[#19253D]"
    >
      <div id="repo-body" className="p-4 text-gray-700">
        <div
          id="repo-heading"
          className="flex items-center justify-between gap-2 pb-1 text-lg font-semibold leading-6"
        >
          <a
            href={repo.html_url}
            target="_blank"
            className="transition-colors hover:text-blue-600 dark:font-medium dark:text-[#dddddd]"
          >
            {/* Repository Name */}
            <p title="click to see on GitHub">{repo.name}</p>
          </a>
          <button className="cursor-default rounded-lg border bg-gray-200 px-3 py-1 text-sm uppercase dark:border-blue-950 dark:bg-[#1F2A47] dark:font-medium dark:text-[#9b9b9b]">
            public
          </button>
        </div>
        <div
          id="repo-description"
          className="text-gray-500 dark:font-normal dark:text-[#9b9b9b]"
        >
          {/* Repository Description */}
          {repo.description
            ? repo.description.slice(0, 200)
            : " Oops.. no description available.."}
        </div>
      </div>
      <div
        id="repo-footer"
        className="flex min-h-12 items-center gap-4 bg-gray-200 px-4 font-semibold dark:bg-[#1F2A47]"
      >
        {repo.language ? (
          <p className="flex items-center gap-1 text-gray-600 dark:font-normal dark:text-[#9b9b9b]">
            <i className="fa-solid fa-code"></i>
            {/* Language Name */}
            {repo.language}
          </p>
        ) : null}

        <p className="flex items-center justify-center gap-1 text-gray-600 dark:font-normal dark:text-[#9b9b9b]">
          <i className="fa-solid fa-star"></i>
          {/* Repo Start Count */}
          {repo.stargazers_count}
        </p>
        <p className="flex items-center gap-1 text-gray-600 dark:font-normal dark:text-[#9b9b9b]">
          <i className="fa-solid fa-code-fork"></i>
          {/* Repo Forks Count */}
          {repo.forks_count}
        </p>
      </div>
    </div>
  );
};
