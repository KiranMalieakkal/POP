import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
/* import logo from "../assets/logo_pop.jpeg" */

const Top_Nav = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start w-20">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a></a>
              </li>
              <li>
              <Link to="/"><a>Home</a></Link>
              </li>
              <li>
                <Link to="/taxinfo"><a>Tax</a></Link>
              </li>
            </ul>
          </div>
        
          <a className="text-xl flex"> <span role="img" aria-label="book">📘</span>
          POP</a>
        
        </div>
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/"><a className="active:bg-violet-700">Home</a></Link>
            </li>
            <li>
              <Link to="/taxinfo" ><a>Tax</a></Link>
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
