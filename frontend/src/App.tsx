import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/DashBoard";
import Home2 from "./components/Home2";
/* import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
 */


function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home2/>}
            />
            <Route
              path="/dashboard/*"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
