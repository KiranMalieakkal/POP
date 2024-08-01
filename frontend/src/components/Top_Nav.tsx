import { NavLink } from "react-router-dom";
//import { ReactComponent as Logo } from "../assets/pop-logo-white.svg";
import Logo from "../assets/pop-logo-white.svg";

const Top_Nav = () => {
  return (
    <div className="navbar bg-blue-900 p-0 h-16">
      <img src={Logo} alt="Logo" className="w-10 h-10 ml-10" />
      <div className="navbar-start w-20 flex items-center">
        <a className="text-2xl text-white font-bold mx-3">POP</a>
      </div>
      <div className="navbar-start flex h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center h-full px-4 ${
              isActive
                ? "text-blue-300 border-t-8 border-blue-300"
                : "text-white hover:text-blue-300"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/receipts"
          className={({ isActive }) =>
            `flex items-center h-full px-4 ${
              isActive
                ? "text-blue-300 border-t-8 border-blue-300"
                : "text-white hover:text-blue-300"
            }`
          }
        >
          Receipts
        </NavLink>
        <NavLink
          to="/tax"
          className={({ isActive }) =>
            `flex items-center h-full px-4 ${
              isActive
                ? "text-blue-300 border-t-8 border-blue-300"
                : "text-white hover:text-blue-300"
            }`
          }
        >
          Tax
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center h-full px-4 ${
              isActive
                ? "text-blue-300 border-t-8 border-blue-300"
                : "text-white hover:text-blue-300"
            }`
          }
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Top_Nav;
