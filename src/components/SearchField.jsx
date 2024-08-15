import React from "react";

export const SearchField = ({ showSearch, setShowSearch }) => {
  return (
    <div
      id="search-field"
      className={`${showSearch ? "hidden" : "flex"} absolute right-0 w-full rounded-3xl border bg-slate-100 mobile:hidden`}
    >
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        id="close-arrow"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600"
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <input
        type="text"
        placeholder="Search username*"
        className="w-full bg-transparent pl-3 outline-none"
      />
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        id="search-button"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};
