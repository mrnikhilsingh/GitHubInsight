import React from "react";
import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <header className="flex justify-between px-5 py-4">
      <div id="logo-container" className="">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <nav>
        <ul className="flex gap-4 text-xl">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
