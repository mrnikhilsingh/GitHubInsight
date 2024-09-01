import React from "react";
import { Link } from "react-router-dom";

export const FollowerCard = ({ followers }) => {
  const { login: name, avatar_url: profilePhoto } = followers;
  return (
    <div
      id="follower-card"
      className="flex min-h-24 items-center justify-between rounded-xl border bg-blue-50 px-4 font-semibold dark:border-blue-950 dark:bg-[#19253B]"
    >
      <div
        id="body"
        className="flex items-center gap-3 text-gray-700 dark:font-medium dark:text-[#dddddd]"
      >
        <div
          id="profile-pic"
          className="h-12 w-12 overflow-hidden rounded-full"
        >
          <img src={profilePhoto} alt="profile photo" loading="lazy" />
        </div>
        <p id="name">{name}</p>
      </div>
      <Link
        to={`/user/${name}`}
        className="flex items-center justify-center rounded-full border bg-gray-200 p-4 text-gray-800 hover:bg-gray-300 dark:border-blue-950 dark:bg-[#1F2A47] dark:hover:border-blue-900 dark:hover:bg-[#222f53]"
      >
        <i className="fa-solid fa-link dark:text-[#dddddd]"></i>
      </Link>
    </div>
  );
};
