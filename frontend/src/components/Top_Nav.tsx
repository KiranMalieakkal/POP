import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
/* import logo from "../assets/logo_pop.jpeg" */

const Top_Nav = () => {
  const [activeButton, setActiveButton] = useState("home");

  function handleClick(buttonName: string) {
    setActiveButton(buttonName);
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start w-20">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="text-lg">
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to="/taxinfo">Tax</Link>
              </li>
            </ul>
          </div>

          <a className="text-xl flex">
            {" "}
            <span role="img" aria-label="book">
              📘
            </span>
            POP
          </a>
        </div>
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <Link
                to="/"
                className={
                  activeButton === "home"
                    ? "active !bg-blue-100 border !text-black"
                    : ""
                }
                onClick={() => handleClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/taxinfo"
                className={
                  activeButton === "taxinfo"
                    ? "active !bg-blue-100 border !text-black"
                    : ""
                }
                onClick={() => handleClick("taxinfo")}
              >
                Tax
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end w-full">
          <a className="btn mr-3 text-xs  h-0 min-h-9">
            <LoginButton /> <LogoutButton />
          </a>
        </div>
      </div>
    </>
  );
};

export default Top_Nav;
