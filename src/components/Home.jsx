import React, { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import Feed from "./Feed";

export const Home = ({ isDark }) => {
  const [error, setError] = useState(null);

  return (
    <main
      id="home"
      className={`${isDark && "dark"} min-h-screen w-full from-[#0f172a] from-15% via-[#111C3F] to-[#0f172a] to-85% dark:bg-gradient-to-r`}
    >
      <div
        id="main-content"
        className="mx-auto flex max-w-[1300px] flex-col justify-between gap-3 px-3 pt-4 small:px-5 tablet:flex-row tablet:gap-6 laptop:px-14"
      >
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <ProfileCard setError={setError} />
            <Feed isDark={isDark} />
          </>
        )}
      </div>
    </main>
  );
};
