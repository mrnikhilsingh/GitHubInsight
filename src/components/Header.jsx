import React, { useState } from "react";
import { SearchField } from "./SearchField";

export const Header = ({ setSearchQuery }) => {
  const [showSearch, setShowSearch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = new FormData(e.target);
    for (const value of inputData.values()) {
      setSearchQuery(value);
    }
    e.target.reset();
  };

  return (
    <header className="sticky top-0 z-10 mx-auto flex max-w-[1300px] items-center justify-between bg-white px-3 py-3 shadow-sm small:px-5 laptop:px-14">
      <div id="logo-container">
        <a href="/" className="text-2xl font-bold text-blue-500">
          GitHub<span className="text-blue-950">Insight</span>
        </a>
      </div>
      <div className="flex items-center justify-between gap-2 tablet:gap-3">
        <SearchField
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          handleSubmit={handleSubmit}
        />
        <form
          id="search-button"
          className="hidden rounded-3xl border bg-slate-100 mobile:block"
          onSubmit={handleSubmit}
        >
          <span className="px-4">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            name="username"
            type="text"
            placeholder="Search username*"
            className="bg-transparent outline-none"
          />
          <button
            type="submit"
            className="rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => {
            setShowSearch(false);
          }}
          id="search-button"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-slate-100 mobile:hidden"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          id="toggle-button"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-slate-100"
        >
          <i className="fa-solid fa-moon"></i>
        </button>
      </div>
    </header>
  );
};
