import React from "react";
import profilePhoto from "../assets/profile.avif";

export const ProfileCard = () => {
  return (
    <section id="user-profile-card" className="w-[20%] px-5 pb-10">
      <div
        id="profile-pic-container"
        className="h-52 w-52 overflow-hidden rounded-full"
      >
        <img src={profilePhoto} alt="Profile Picture" className="" />
      </div>
      <div id="profile-info">
        <p id="name" className="pt-4 text-2xl font-bold text-blue-950">
          Meta
        </p>
        <p id="username" className="pb-2 text-sm font-semibold text-blue-600">
          facebook
        </p>
        <p id="bio" className="pb-2 text-sm font-semibold text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic sequi
          facilis omnis earum iure. Repellendus.
        </p>
        <div
          id="github-link"
          className="rounded-md border bg-blue-200 py-2 text-center font-semibold text-blue-500"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          <a href="#" className="pl-2">
            See on GitHub
          </a>
        </div>
        <div id="social-links" className="flex flex-col gap-1 pt-4">
          <div id="user-addr" className="text-sm text-blue-950">
            <i className="fa-solid fa-location-dot h-[14px] w-[14px] text-center"></i>
            <span className="pl-3 font-semibold text-gray-600">India</span>
          </div>
          <div id="website-link" className="text-sm text-blue-950">
            <a href="#">
              <i className="fa-solid fa-link h-[14px] w-[14px]"></i>
              <span className="pl-3 font-semibold text-gray-600">
                opensource.fb.com
              </span>
            </a>
          </div>
          <div id="twitter-link" className="text-sm text-blue-950">
            <a href="#">
              <i className="fa-brands fa-x-twitter h-[14px] w-[14px]"></i>
              <span className="pl-3 font-semibold text-gray-600">
                @MetaOpenSource
              </span>
            </a>
          </div>
        </div>
        <div id="followers-info" className="flex flex-col gap-1 pt-4">
          <div id="repo-count" className="text-sm text-blue-950">
            <span className="font-bold">131</span>
            <span className="pl-2 font-semibold text-gray-600">Repo</span>
          </div>
          <div id="followers-count" className="text-sm text-blue-950">
            <span className="font-bold">11.7k</span>
            <span className="pl-2 font-semibold text-gray-600">Followers</span>
          </div>
          <div id="follow-count" className="text-sm text-blue-950">
            <span className="font-bold">0</span>
            <span className="pl-2 font-semibold text-gray-600">Following</span>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-xs font-semibold text-gray-600">
          &#169; 2024 Made with by ♥ Nikhil Singh
        </p>
      </div>
    </section>
  );
};
