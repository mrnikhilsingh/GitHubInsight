import React from "react";
import { ProfileCard } from "./ProfileCard";
import Feed from "./Feed";

export const Home = ({ searchQuery }) => {
  return (
    <main
      id="home"
      className="mx-auto flex w-full max-w-[1300px] flex-col justify-between gap-3 px-3 pt-4 small:px-5 tablet:flex-row tablet:gap-6 laptop:px-14"
    >
      <ProfileCard searchQuery={searchQuery} />
      <Feed searchQuery={searchQuery} />
    </main>
  );
};
