import { Link } from "react-router-dom";

/* import logo from "../assets/logo_pop.jpeg" */

const Top_Nav = () => {
  function handleClick(buttonName: string) {
    setActiveButton(buttonName);
  }
  return (
    <>
      <div className="navbar bg-blue-800">
        <div className="navbar-start w-20">
          <a className="text-2xl text-white flex mx-3">POP</a>
        </div>
        <div className="navbar-start hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <Link
                to="/"
                className="text-white"
                onClick={() => handleClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/desktoptax"
                className="text-white"
                onClick={() => handleClick("taxinfo")}
              >
                Tax
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Top_Nav;
