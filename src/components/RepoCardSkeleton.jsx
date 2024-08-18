import React from "react";

export const RepoCardSkeleton = () => {
  return Array(6)
    .fill(0)
    .map((_, index) => {
      return (
        <div
          key={index}
          className="flex animate-pulse flex-col justify-between rounded-lg border bg-gray-200"
        >
          <div id="header" className="flex flex-col gap-2 px-4 pt-5">
            <div className="h-7 w-48 rounded-full bg-gray-300"></div>
            <div className="h-5 w-full rounded-full bg-gray-300"></div>
            <div className="h-5 w-8/12 rounded-full bg-gray-300"></div>
          </div>
          <div>
            <div
              id="divider"
              className="mt-5 h-1 rounded-full bg-gray-300"
            ></div>
            <div id="footer" className="flex gap-4 px-4 py-5">
              <div className="h-5 w-16 rounded-full bg-gray-300"></div>
              <div className="h-5 w-16 rounded-full bg-gray-300"></div>
              <div className="h-5 w-16 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      );
    });
};
