import React from "react";

export const SearchField = ({ showSearch, setShowSearch, handleSubmit }) => {
  return (
    <form
      id="search-field-mobile"
      className={`${showSearch ? "hidden" : "flex"} absolute right-0 w-full rounded-3xl border bg-slate-100 mobile:hidden`}
      onSubmit={handleSubmit}
    >
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        id="close-arrow"
        type="button"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600"
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <input
        name="username"
        type="text"
        placeholder="Search username*"
        className="w-full bg-transparent pl-3 outline-none"
      />
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        id="search-button"
        type="submit"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};
