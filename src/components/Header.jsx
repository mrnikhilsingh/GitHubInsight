import React, { useState } from "react";
import { SearchField } from "./SearchField";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = ({ isDark, handleThemeSwitch }) => {
  const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up(599));
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = new FormData(e.target);
    for (const value of inputData.values()) {
      if (value) {
        // Redirect to the desired URL
        navigate(`/user/${value}`);
      }
    }
    e.target.reset();
  };

  return (
    <header
      className={`${isDark && "dark"} sticky top-0 z-10 bg-white from-[#0f172a] from-15% via-[#111C3F] to-[#0f172a] to-85% shadow-sm dark:bg-gradient-to-r`}
    >
      <div
        id="header-content"
        className="mx-auto flex max-w-[1300px] items-center justify-between px-3 py-3 small:px-5 laptop:px-14"
      >
        <div id="logo-container">
          <a href="/" className="text-2xl font-bold text-blue-500">
            GitHub<span className="text-blue-950 dark:text-white">Insight</span>
          </a>
        </div>
        <div className="flex items-center justify-between gap-2 tablet:gap-3">
          {!isWideScreen && (
            <SearchField
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              handleSubmit={handleSubmit}
            />
          )}
          {!isWideScreen && (
            <button
              onClick={() => {
                setShowSearch(true);
              }}
              id="search-button-mobile"
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-slate-100 mobile:hidden dark:border-blue-950 dark:bg-[#1f2a47]"
            >
              <i className="fa-solid fa-magnifying-glass dark:text-white"></i>
            </button>
          )}
          {isWideScreen && (
            <form
              id="search-field-desktop"
              className="hidden rounded-3xl border bg-slate-100 mobile:block dark:border-blue-950 dark:bg-[#1F2A47] dark:focus-within:border-2 dark:focus-within:border-blue-800"
              onSubmit={handleSubmit}
            >
              <span className="px-4">
                <i className="fa-solid fa-magnifying-glass dark:text-white"></i>
              </span>
              <input
                name="username"
                type="search"
                placeholder="Search username*"
                className="bg-transparent outline-none dark:text-white"
              />
              <button
                type="submit"
                className="rounded-3xl bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          )}
          <button
            id="toggle-button"
            className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border bg-slate-100 hover:bg-gray-300 dark:border-blue-950 dark:bg-[#1F2A47] dark:hover:border-blue-900 dark:hover:bg-[#222f53]"
            onClick={handleThemeSwitch}
          >
            <i
              className={`fa-solid ${isDark ? "fa-sun text-white" : "fa-moon"}`}
            ></i>
          </button>
        </div>
      </div>
    </header>
  );
};
