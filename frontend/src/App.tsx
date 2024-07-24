import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/DashBoard";

import Home from "./components/Home";
import Top_Nav from "./components/Top_Nav";

function App() {
  return (
    <>
        <BrowserRouter>
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
