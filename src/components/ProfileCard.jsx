import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";

export const ProfileCard = ({ searchQuery }) => {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const defaultSearchQuery = "mrnikhilsingh";
    const url = `https://api.github.com/users/${searchQuery || defaultSearchQuery}`;
    console.log(url);

    axios
      .get(url)
      .then(({ data }) => {
        setProfileInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  return (
    <section
      id="user-profile-card"
      className="shrink-0 pb-6 tablet:sticky tablet:top-[82px] tablet:max-h-[660px] tablet:w-[248px]"
    >
      <div
        id="profile-pic-container"
        className="mx-auto max-h-52 max-w-52 overflow-hidden rounded-full border small:mx-0"
      >
        <img src={profileInfo.avatar_url} alt="Profile Picture" />
      </div>
      <div id="profile-info">
        <p
          id="name"
          className="pt-2 text-3xl font-bold text-blue-950 small:text-2xl"
        >
          {profileInfo.name}
        </p>
        <p
          id="username"
          className="pb-2 font-semibold text-blue-600 small:text-sm"
        >
          {profileInfo.login}
        </p>
        <p id="bio" className="pb-2 text-sm font-semibold text-gray-600">
          {profileInfo.bio}
        </p>
        <div
          id="github-link"
          className="rounded-md border bg-blue-200 py-2 text-center text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-300"
          title="view GitHub profile"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          <a href={profileInfo.html_url} target="_blank" className="pl-2">
            See on GitHub
          </a>
        </div>
        <div id="social-links" className="flex flex-col gap-1 pt-4">
          <div id="user-addr" className="text-blue-950 small:text-sm">
            <i className="fa-solid fa-location-dot h-[14px] w-[14px] text-center"></i>
            <span className="pl-3 font-semibold text-gray-600">India</span>
          </div>
          <div
            id="website-link"
            className="text-blue-950 small:text-sm"
            title="website link"
          >
            <a href="#">
              <i className="fa-solid fa-link h-[14px] w-[14px]"></i>
              <span className="pl-3 font-semibold text-gray-600 transition-colors hover:text-blue-600">
                nscoffee.com
              </span>
            </a>
          </div>
          <div
            id="twitter-link"
            className="text-blue-950 small:text-sm"
            title="twitter link"
          >
            <a href={`https://twitter.com/${profileInfo.twitter_username}`}>
              <i className="fa-brands fa-x-twitter h-[14px] w-[14px]"></i>
              <span className="pl-3 font-semibold text-gray-600 transition-colors hover:text-blue-600">
                @{profileInfo.twitter_username}
              </span>
            </a>
          </div>
        </div>
        <div id="followers-info" className="flex flex-col gap-1 pt-4">
          <div id="repo-count" className="text-blue-950 small:text-sm">
            <span className="font-bold">{profileInfo.public_repos}</span>
            <span className="pl-2 font-semibold text-gray-600">Repo</span>
          </div>
          <div id="followers-count" className="text-blue-950 small:text-sm">
            <span className="font-bold">{profileInfo.followers}</span>
            <span className="pl-2 font-semibold text-gray-600">Followers</span>
          </div>
          <div id="follow-count" className="text-blue-950 small:text-sm">
            <span className="font-bold">{profileInfo.following}</span>
            <span className="pl-2 font-semibold text-gray-600">Following</span>
          </div>
        </div>
        <div className="hidden tablet:block">
          <hr className="my-4" />
          <p className="text-xs font-semibold text-gray-600">
            <i className="fa-regular fa-copyright"></i> 2024 Made with by{" "}
            <i className="fa-solid fa-heart"></i> Nikhil Singh
          </p>
        </div>
      </div>
      <ProfileCardSkeleton />
    </section>
  );
};
