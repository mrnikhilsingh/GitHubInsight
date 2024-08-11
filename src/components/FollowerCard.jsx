import React from "react";
import profilePhoto from "../assets/profile.avif";

export const FollowerCard = () => {
  return (
    <div
      id="follower-card"
      className="flex min-h-24 items-center justify-between rounded-xl border bg-blue-50 px-4 font-semibold"
    >
      <div id="body" className="flex items-center gap-3 text-gray-700">
        <div
          id="profile-pic"
          className="max-h-12 max-w-12 overflow-hidden rounded-full"
        >
          <img src={profilePhoto} alt="profile photo" />
        </div>
        <p id="name">John Smith</p>
      </div>
      <a
        href="#"
        className="flex items-center justify-center rounded-full bg-gray-200 p-4 text-gray-800"
      >
        <i class="fa-solid fa-link"></i>
      </a>
    </div>
  );
};
