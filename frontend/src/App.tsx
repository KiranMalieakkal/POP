import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import Dashboard from "./components/DashBoard";
import Home2 from "./components/Home2";
/* import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
 */

=======
import Home from "./components/Home";
// import Profile from "./components/Profile";
// import Tax from "./components/Tax";
import Top_Nav from "./components/Top_Nav";
>>>>>>> main

function App() {
  return (
    <>
        <BrowserRouter>
        <Top_Nav/>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/dashboard/*"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>

        
        {/* <Profile /> */}
        {/* <Tax/> */}
      
    </>
  );
}

export default App;
