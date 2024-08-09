import React from "react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-4 shadow-sm">
      <div id="logo-container" className="">
        <a href="/" className="font-sans text-2xl font-bold text-blue-500">
          GitHub<span className="text-blue-950">Insight</span>
        </a>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div id="search-button" className="rounded-3xl border bg-slate-100">
          <span className="px-4">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            placeholder="Search username*"
            className="bg-transparent outline-none"
          />
          <button className="rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
            Search
          </button>
        </div>
        <span
          id="toggle-button"
          className="p- flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border bg-slate-100"
        >
          <i class="fa-solid fa-moon"></i>
        </span>
      </div>
    </header>
  );
};
