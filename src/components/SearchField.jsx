import React from "react";

export const SearchField = ({ showSearch, setShowSearch, handleSubmit }) => {
  return (
    <form
      id="search-field-mobile"
      className={`${showSearch ? "flex" : "hidden"} absolute right-0 flex w-full rounded-3xl border bg-slate-100 mobile:hidden dark:border-blue-900 dark:bg-[#1f2a47] dark:text-white`}
      onSubmit={handleSubmit}
    >
      <button
        onClick={() => {
          setShowSearch(false);
        }}
        id="close-arrow"
        type="button"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600 dark:border-blue-900"
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <input
        name="username"
        type="search"
        placeholder="Search username*"
        className="w-full bg-transparent pl-3 outline-none"
      />
      <button
        onClick={() => {
          setShowSearch(false);
        }}
        id="search-button"
        type="submit"
        className="hover:bg-blue-60 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-blue-500 text-white hover:bg-blue-600 dark:border-blue-900"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};
