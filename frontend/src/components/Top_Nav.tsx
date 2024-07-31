import { Link } from "react-router-dom";

/* import logo from "../assets/logo_pop.jpeg" */

const Top_Nav = () => {
  function handleClick(buttonName: string) {
    //setActiveButton(buttonName);
    console.log("button in top nav clicked" + buttonName);
  }
  return (
    <>
      <div className="navbar bg-blue-800">
        <div className="navbar-start w-20">
          <a className="text-2xl text-white flex mx-3">POP</a>
        </div>
        <div className="navbar-start">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <Link
                to="/"
                className="text-white"
                onClick={() => handleClick("homee")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/receipts"
                className="text-white"
                onClick={() => handleClick("receipto")}
              >
                Receipts
              </Link>
            </li>
            <li>
              <Link
                to="/tax"
                className="text-white"
                onClick={() => handleClick("taxas")}
              >
                Tax
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-white"
                onClick={() => handleClick("profile")}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Top_Nav;
