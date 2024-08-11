import React from "react";
import { ProfileCard } from "./ProfileCard";
import Feed from "./Feed";

export const Home = () => {
  return (
    <main id="home" className="flex w-full justify-between gap-10 px-10 pt-4">
      <ProfileCard />
      <Feed />
    </main>
  );
};
