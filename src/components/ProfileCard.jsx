import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import { useParams } from "react-router-dom";

export const ProfileCard = ({ searchQuery, setError }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    setLoadingProfile(true);
    const fetchProfileInfo = async () => {
      const defaultSearchQuery = "mrnikhilsingh";
      const query = username || searchQuery || defaultSearchQuery;
      const url = `https://api.github.com/users/${query}`;
      try {
        const response = await axios.get(url);
        setProfileInfo(response.data);
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load repositories. Please try again later.",
          err.message,
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileInfo();
  }, [searchQuery, username]);

  return (
    <section
      id="user-profile-card"
      className="shrink-0 pb-6 tablet:sticky tablet:top-[82px] tablet:max-h-[660px] tablet:w-[248px]"
    >
      {loadingProfile ? (
        <ProfileCardSkeleton />
      ) : (
        <>
          <div
            id="profile-pic-container"
            className="mx-auto h-52 w-52 overflow-hidden rounded-full border small:mx-0 dark:border-blue-900"
          >
            <img
              src={profileInfo.avatar_url}
              alt="Profile Picture"
              loading="lazy"
            />
          </div>
          <div id="profile-info">
            <p
              id="name"
              className="pt-2 text-3xl font-medium text-blue-950 small:text-2xl dark:text-white"
            >
              {profileInfo.name}
            </p>
            <p
              id="username"
              className="pb-2 font-medium text-blue-600 small:text-sm"
            >
              {profileInfo.login}
            </p>
            <p
              id="bio"
              className="pb-2 text-sm font-semibold text-gray-600 dark:font-normal dark:text-white"
            >
              {profileInfo.bio}
            </p>
            <div
              id="github-link"
              className="mx-2 rounded-md border bg-blue-200 py-2 text-center text-sm font-semibold text-blue-500 transition-all ease-in-out tablet:hover:-translate-y-1 tablet:hover:scale-105 dark:border-blue-950 dark:bg-[#1F2A47] dark:text-blue-400"
              title="view GitHub profile"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <a href={profileInfo.html_url} target="_blank" className="pl-2">
                See on GitHub
              </a>
            </div>
            <div id="social-links" className="flex flex-col gap-1 pt-4">
              {profileInfo.location && (
                <div
                  id="user-addr"
                  className="text-blue-950 small:text-sm dark:text-white"
                >
                  <i className="fa-solid fa-location-dot h-[14px] w-[14px] text-center"></i>
                  <span className="pl-3 font-semibold text-gray-600 dark:font-normal dark:text-white">
                    {profileInfo.location}
                  </span>
                </div>
              )}
              {profileInfo.blog && (
                <div
                  id="website-link"
                  className="font-medium text-blue-950 small:text-sm"
                  title="website link"
                >
                  <a
                    href={profileInfo.blog}
                    target="_blank"
                    className="flex dark:text-white"
                  >
                    <i className="fa-solid fa-link h-[14px] w-[14px]"></i>
                    <p className="break-all pl-3 text-gray-600 transition-colors hover:text-blue-600 dark:font-normal dark:text-white">
                      {profileInfo.blog}
                    </p>
                  </a>
                </div>
              )}
              <div
                id="twitter-link"
                className="text-blue-950 small:text-sm dark:text-white"
                title="twitter link"
              >
                <a
                  href={`https://twitter.com/${profileInfo.twitter_username}`}
                  target="_blank"
                >
                  <i className="fa-brands fa-x-twitter h-[14px] w-[14px]"></i>
                  <span className="pl-3 font-semibold text-gray-600 transition-colors hover:text-blue-600 dark:font-normal dark:text-white">
                    @{profileInfo.twitter_username}
                  </span>
                </a>
              </div>
            </div>
            <div id="followers-info" className="flex flex-col gap-1 pt-4">
              <div id="repo-count" className="text-blue-950 small:text-sm">
                <span className="font-bold dark:font-normal dark:text-white">
                  {profileInfo.public_repos}
                </span>
                <span className="pl-2 font-semibold text-gray-600 dark:font-normal dark:text-white">
                  Repo
                </span>
              </div>
              <div id="followers-count" className="text-blue-950 small:text-sm">
                <span className="font-bold dark:font-normal dark:text-white">
                  {profileInfo.followers}
                </span>
                <span className="pl-2 font-semibold text-gray-600 dark:font-normal dark:text-white">
                  Followers
                </span>
              </div>
              <div id="follow-count" className="text-blue-950 small:text-sm">
                <span className="font-bold dark:font-normal dark:text-white">
                  {profileInfo.following}
                </span>
                <span className="pl-2 font-semibold text-gray-600 dark:font-normal dark:text-white">
                  Following
                </span>
              </div>
            </div>
            <div className="hidden tablet:block">
              <hr className="my-4 dark:border-gray-800" />
              <p className="text-xs font-semibold text-gray-600 dark:font-normal dark:text-white">
                <i className="fa-regular fa-copyright"></i> 2024 Made with by{" "}
                <i className="fa-solid fa-heart"></i> Nikhil Singh
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
