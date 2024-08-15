import React from "react";

export const ProfileCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div
        id="profile-pic-container"
        className="h-52 w-52 rounded-full bg-gray-300"
      ></div>
      <div className="mt-5 h-7 w-3/5 rounded-full bg-gray-300"></div>
      <div className="mt-5 h-4 w-2/5 rounded-full bg-gray-300"></div>
      <div className="mt-2 h-4 w-full rounded-full bg-gray-300"></div>
      <div className="mt-2 h-4 w-4/5 rounded-full bg-gray-300"></div>
    </div>
  );
};
